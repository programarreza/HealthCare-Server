import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import { changePassword, loginUser, refreshToken } from "./auth.controller";

const authRoutes = Router();
authRoutes.post("/login", loginUser);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  changePassword
);

export default authRoutes;
