import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";

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
    "abcdefg",
    "5m"
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijk",
    "30d"
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
    decodedData = verifyToken(token, "abcdefghijk");
  } catch (error) {
    throw new Error("You are not authorized!");
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
    "abcdefg",
    "5m"
  );

  return { accessToken, needPasswordChange: userData.needPasswordChange };
};

export { loginUserFromDB, refreshTokenIntoDB };
