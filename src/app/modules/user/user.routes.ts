import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../../helpers/fileUploader";
import auth from "../../middleware/auth";
import { createAdmin } from "./user.controller";
import { createAdminSchemaValidation } from "./user.validation";

const userRoutes = Router();

userRoutes.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createAdminSchemaValidation.parse(JSON.parse(req.body.data));
    return createAdmin(req, res, next);
  }
);

export default userRoutes;
