import { Patient, Prisma, UserStatus } from "@prisma/client";
import dayjs from "dayjs";
import { calculatePagination } from "../../../helpers/pagination.helpers";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/TPasination";
import { patientSearchAbleField } from "./patient.constant";
import { TPatientFilterRequest, TPatientUpdate } from "./patient.interface";

const getAllPatientFromDB = async (
  params: TPatientFilterRequest,
  options: TPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(
    options as any
  );
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchAbleField.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput = { AND: andConditions };

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },

    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  const total = await prisma.patient.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePatientFromDB = async (id: string): Promise<Patient | null> => {
  await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

const updatePatientIntoDB = async (
  id: string,
  payload: Partial<TPatientUpdate>
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;

  // convert to ISOformat of dateOfBirth
  if (patientHealthData && patientHealthData.dateOfBirth) {
    patientHealthData.dateOfBirth = dayjs(
      patientHealthData.dateOfBirth
    ).toISOString();
  }

  // checking patient data
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (transactionClient) => {
    // operation-1: update patient data
    await transactionClient.patient.update({
      where: {
        id,
      },
      data: patientData,
      include: {
        patientHealthData: true,
        medicalReport: true,
      },
    });

    // operation-2: create or update patient health data
    if (patientHealthData) {
      await transactionClient.patientHealthData.upsert({
        where: {
          patientId: patientInfo.id,
        },
        update: patientHealthData,
        create: { ...patientHealthData, patientId: patientInfo.id },
      });
    }

    // operation-3: create or update medical report data
    if (medicalReport) {
      await transactionClient.medicalReport.create({
        data: { ...medicalReport, patientId: patientInfo.id },
      });
    }
  });

  const responseData = await prisma.patient.findUnique({
    where: {
      id: patientInfo.id,
    },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });

  return responseData;
};

const deletePatientIntoDB = async (id: string): Promise<Patient | null> => {
  // patient data
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  console.log({ patientInfo });

  const result = await prisma.$transaction(async (tx) => {
    // delete medical report
    if (patientInfo.medicalReport.length > 0)
      await tx.medicalReport.deleteMany({
        where: {
          patientId: id,
        },
      });

    // delete patient health data
    if (patientInfo.patientHealthData) {
      await tx.patientHealthData.delete({
        where: {
          patientId: id,
        },
      });
    }

    // delete patient data
    const deletedPatient = await tx.patient.delete({
      where: {
        id,
      },
    });

    // delete user
    await tx.user.delete({
      where: {
        email: deletedPatient.email,
      },
    });

    return deletedPatient;
  });

  return result;
};

const softDeletePatientFromDB = async (id: string): Promise<Patient | null> => {
  const result = await prisma.$transaction(async (transactionClient) => {
    // Step-1: delete patient
    const deletedPatient = await transactionClient.patient.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    // Step-2: delete user
    await transactionClient.user.update({
      where: {
        email: deletedPatient.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deletedPatient;
  });

  return result;
};

export {
  deletePatientIntoDB,
  getAllPatientFromDB,
  getSinglePatientFromDB,
  softDeletePatientFromDB,
  updatePatientIntoDB,
};
