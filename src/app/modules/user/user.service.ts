import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { uploadToCloudinary } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";

const createAdminIntoDB = async (req: any) => {
  const { password, admin } = req.body;
  const file: IFile = req.file;

  if (file) {
    const uploadedCloudinary = await uploadToCloudinary(file);
    console.log(uploadToCloudinary);
    admin.profilePhoto = uploadedCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    email: admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createAdminData = await transactionClient.admin.create({
      data: admin,
    });

    return createAdminData;
  });

  return result;
};

export { createAdminIntoDB };
