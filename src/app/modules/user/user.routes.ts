import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import { createAdmin } from "./user.controller";
import { upload } from "../../../helpers/fileUploader";

const userRoutes = Router();

userRoutes.post(
  "/",
  upload.single("file"),
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  createAdmin
);

export default userRoutes;
