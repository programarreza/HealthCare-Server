import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import {
  changePassword,
  forgotPassword,
  loginUser,
  refreshToken,
  resetPassword,
} from "./auth.controller";

const authRoutes = Router();
authRoutes.post("/login", loginUser);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  changePassword
);

authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
