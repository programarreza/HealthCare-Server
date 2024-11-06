import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleField } from "./admin.constant";

const prisma = new PrismaClient();

const getAllAdminsFromDB = async (params: any) => {
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleField.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  console.dir(andConditions, { depth: "infinity" });

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export { getAllAdminsFromDB };
