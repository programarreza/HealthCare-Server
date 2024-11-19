import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { uploadToCloudinary } from "../../../helpers/fileUploader";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";

const createAdminIntoDB = async (req: Request) => {
  const { password, admin } = req.body;
  const file = req.file as IFile;

  if (file) {
    const uploadedCloudinary = await uploadToCloudinary(file);
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

const createDoctorIntoDB = async (req: Request) => {
  const { password, doctor } = req.body;
  const file = req.file as IFile;

  if (file) {
    const uploadedCloudinary = await uploadToCloudinary(file);
    doctor.profilePhoto = uploadedCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    email: doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createDoctorData = await transactionClient.doctor.create({
      data: doctor,
    });

    return createDoctorData;
  });

  return result;
};

const createPatientIntoDB = async (req: Request) => {
  const { password, patient } = req.body;
  const file = req.file as IFile;

  if (file) {
    const uploadedCloudinary = await uploadToCloudinary(file);
    patient.profilePhoto = uploadedCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = {
    email: patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createPatientData = await transactionClient.patient.create({
      data: patient,
    });

    return createPatientData;
  });

  return result;
};

export { createAdminIntoDB, createDoctorIntoDB, createPatientIntoDB };
