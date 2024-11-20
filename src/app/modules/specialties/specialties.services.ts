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

export { createSpecialtiesIntoDB };
