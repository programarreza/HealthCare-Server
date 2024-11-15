import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateToken, verifyToken } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import config from "../../config";
import ApiError from "../../error/ApiError";

const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshTokenIntoDB = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, config.jwt_refresh_secret as string);
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return { accessToken, needPasswordChange: userData.needPasswordChange };
};

const changePasswordIntoDB = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: "ACTIVE",
    },
  });

  // check password
  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password incorrect!");
  }

  // hashed password
  const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

  // update password
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

export { changePasswordIntoDB, loginUserFromDB, refreshTokenIntoDB };
