import { Router } from "express";
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

adminRoutes.get("/", getAllAdmin);
adminRoutes.get("/:id", getSingleAdminById);
adminRoutes.patch(
  "/:id",
  validateRequest(updateAdminValidationSchema),
  updateAdmin
);
adminRoutes.delete("/:id", deleteAdmin);
adminRoutes.delete("/soft/:id", softDeleteAdmin);

export default adminRoutes;
