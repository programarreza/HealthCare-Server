import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  deleteAdmin,
  getAllAdmin,
  getSingleAdminById,
  softDeleteAdmin,
  updateAdmin,
} from "./admin.controller";
import { updateAdminValidationSchema } from "./admin.validation";

const adminRoutes = Router();

adminRoutes.get("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), getAllAdmin);
adminRoutes.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  getSingleAdminById
);
adminRoutes.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateAdminValidationSchema),
  updateAdmin
);
adminRoutes.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteAdmin
);
adminRoutes.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  softDeleteAdmin
);

export default adminRoutes;
