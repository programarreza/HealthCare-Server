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
    },
  });

  return result;
};

export { getAllDoctorsFromDB, getSingleDoctorFromDB };
