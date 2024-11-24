import { Prisma, UserStatus } from "@prisma/client";
import { calculatePagination } from "../../../helpers/pagination.helpers";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/TPasination";
import { doctorSearchableFields } from "./doctor.constant";
import { TDoctorFilterRequest } from "./doctor.interface";

const getAllDoctorsFromDB = async (
  filters: TDoctorFilterRequest,
  options: TPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(
    options as any
  );

  const { searchTerm, specialties, ...filterData } = filters;
  const andConditions: Prisma.DoctorWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: doctorSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // doctor > doctorSpecialties > specialties -> title

  if (specialties && specialties.length > 0) {
    andConditions.push({
      doctorSpecialties: {
        some: {
          specialties: {
            title: {
              contains: specialties,
              mode: "insensitive",
            },
          },
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));
    andConditions.push(...filterConditions);
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.DoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { averageRating: "desc" },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
      // review: {
      //   select: {
      //     rating: true,
      //   },
      // },
    },
  });

  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleDoctorFromDB = async (id: string) => {
  // find doctor
  const result = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

const softDeleteDoctorIntoDB = async (id: string) => {
  // find doctor
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    // update from doctor table
    const doctorData = await transactionClient.doctor.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    // update from user table
    await transactionClient.user.update({
      where: {
        email: doctorData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
  });

  return result;
};

const deleteDoctorIntoDB = async (id: string) => {
  // find doctor
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const doctorSpecialtiesData =
      await transactionClient.doctorSpecialties.deleteMany({
        where: {
          doctorId: id,
        },
      });

    const doctorData = await transactionClient.doctor.delete({
      where: {
        id,
      },
    });

    const userData = await transactionClient.user.delete({
      where: {
        email: doctorData.email,
      },
    });
  });

  return result;
};

const updateDoctorIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;

  //Step-1: Find doctor
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  // Step-2: Perform transaction
  await prisma.$transaction(async (transactionClient) => {
    // update doctor details
    const updateDoctorData = await transactionClient.doctor.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });

    if (specialties && specialties.length > 0) {
      // Filter specialties to delete
      const deleteSpecialtiesIds = specialties
        .filter((specialty: any) => specialty.isDeleted)
        .map((specialty: any) => specialty.specialtiesId);

      // Delete specialties in bulk if needed
      if (deleteSpecialtiesIds.length > 0) {
        await transactionClient.doctorSpecialties.deleteMany({
          where: {
            doctorId: id,
            specialtiesId: { in: deleteSpecialtiesIds },
          },
        });
      }

      // Filter specialties to create
      const createSpecialties = specialties.filter(
        (specialty: any) => !specialty.isDeleted
      );

      // Check for existing records before creating
      for (const specialty of createSpecialties) {
        const existingRecord =
          await transactionClient.doctorSpecialties.findFirst({
            where: {
              doctorId: id,
              specialtiesId: specialty.specialtiesId,
            },
          });

        if (!existingRecord) {
          await transactionClient.doctorSpecialties.create({
            data: {
              doctorId: id,
              specialtiesId: specialty.specialtiesId,
            },
          });
        }
      }
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  return result;
};

export {
  deleteDoctorIntoDB,
  getAllDoctorsFromDB,
  getSingleDoctorFromDB,
  softDeleteDoctorIntoDB,
  updateDoctorIntoDB,
};
