import { Prisma, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { uploadToCloudinary } from "../../../helpers/fileUploader";
import { calculatePagination } from "../../../helpers/pagination.helpers";
import prisma from "../../../shared/prisma";
import { IFile } from "../../interfaces/file";
import { TPaginationOptions } from "../../interfaces/TPasination";
import { userSearchableFields } from "./user.constant";

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

const getAllUsersFromDB = async (params: any, options: TPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(
    options as any
  );
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
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

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };

  const result = await prisma.user.findMany({
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
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
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

const updateUserStatusIntoDB = async (id: string, data: { status: any }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  return updateUserStatus;
};

const getProfileFromDB = async (user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
    },
  });

  let userInfo;

  if (userData?.role === UserRole.SUPER_ADMIN) {
    userInfo = await prisma.admin.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData?.role === UserRole.ADMIN) {
    userInfo = await prisma.admin.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData?.role === UserRole.DOCTOR) {
    userInfo = await prisma.doctor.findUnique({
      where: {
        email: userData.email,
      },
    });
  } else if (userData?.role === UserRole.PATIENT) {
    userInfo = await prisma.patient.findUnique({
      where: {
        email: userData.email,
      },
    });
  }

  return { ...userData, ...userInfo };
};

const UpdateProfileFromDB = async (user: JwtPayload, req: Request) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const file = req.file;
  if (file) {
    const uploadedCloudinary = await uploadToCloudinary(file);
    req.body.profilePhoto = uploadedCloudinary?.secure_url;
  }

  let userInfo;

  if (userData?.role === UserRole.SUPER_ADMIN) {
    userInfo = await prisma.admin.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData?.role === UserRole.ADMIN) {
    userInfo = await prisma.admin.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData?.role === UserRole.DOCTOR) {
    userInfo = await prisma.doctor.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  } else if (userData?.role === UserRole.PATIENT) {
    userInfo = await prisma.patient.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  }

  return userInfo;
};

export {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
  getAllUsersFromDB,
  getProfileFromDB,
  UpdateProfileFromDB,
  updateUserStatusIntoDB,
};
