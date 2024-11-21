import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

const getAllDoctorsFromDB = async () => {
  const result = await prisma.doctor.findMany({
    where: {
      isDeleted: false,
    },
  });

  return result;
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

export {
  deleteDoctorIntoDB,
  getAllDoctorsFromDB,
  getSingleDoctorFromDB,
  softDeleteDoctorIntoDB,
};
