import prisma from "../../../shared/prisma";

const getAllDoctorsFromDB = async () => {
  const result = await prisma.doctor.findMany({
    where: {
      isDeleted: false,
    },
  });

  return result;
};

export { getAllDoctorsFromDB };
