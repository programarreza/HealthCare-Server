import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../../helpers/fileUploader";
import auth from "../../middleware/auth";
import { createAdmin, createDoctor, createPatient } from "./user.controller";
import {
  createAdminSchemaValidation,
  createDoctorSchemaValidation,
  createPatientSchemaValidation,
} from "./user.validation";

const userRoutes = Router();

userRoutes.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createAdminSchemaValidation.parse(JSON.parse(req.body.data));
    return createAdmin(req, res, next);
  }
);

userRoutes.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createDoctorSchemaValidation.parse(JSON.parse(req.body.data));
    return createDoctor(req, res, next);
  }
);

userRoutes.post(
  "/create-patient",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createPatientSchemaValidation.parse(JSON.parse(req.body.data));
    return createPatient(req, res, next);
  }
);

export default userRoutes;
