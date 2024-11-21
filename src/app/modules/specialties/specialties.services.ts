import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { uploadToCloudinary } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import ApiError from "../../error/ApiError";

const createSpecialtiesIntoDB = async (req: Request) => {
  const isExist = await prisma.specialties.findFirst({
    where: {
      title: req.body.title,
    },
  });

  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, "This specialties already exist");
  }

  const file = req.file;

  if (file) {
    const uploadedCloudinary = await uploadToCloudinary(file);
    req.body.icon = uploadedCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

const getAllSpecialtiesFromDB = async () => {
  const result = await prisma.specialties.findMany();

  return result;
};

const deleteSpecialtiesIntoDB = async (id: string) => {
  // find the specialties
  const specialties = await prisma.specialties.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // delete from DoctorSpecialties and specialties table data
  const result = await prisma.$transaction(async (transactionClient) => {
    // step-1
    await transactionClient.doctorSpecialties.deleteMany({
      where: {
        specialtiesId: specialties.id,
      },
    });

    // step-2
    await transactionClient.specialties.delete({
      where: {
        id: specialties.id,
      },
    });

    return null;
  });
};

export {
  createSpecialtiesIntoDB,
  deleteSpecialtiesIntoDB,
  getAllSpecialtiesFromDB,
};
