import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../../helpers/fileUploader";
import auth from "../../middleware/auth";
import { createSpecialties, getAllSpecialties } from "./specialties.controller";
import { createSpecialtiesSchemaValidation } from "./specialties.validation";

const specialtiesRoutes = Router();

specialtiesRoutes.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createSpecialtiesSchemaValidation.parse(
      JSON.parse(req.body.data)
    );
    return createSpecialties(req, res, next);
  }
);

specialtiesRoutes.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  getAllSpecialties
);

export default specialtiesRoutes;
