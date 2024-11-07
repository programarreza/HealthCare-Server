import { Router } from "express";
import {
  deleteAdmin,
  getAllAdmin,
  getSingleAdminById,
  softDeleteAdmin,
  updateAdmin,
} from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/", getAllAdmin);
adminRoutes.get("/:id", getSingleAdminById);
adminRoutes.patch("/:id", updateAdmin);
adminRoutes.delete("/:id", deleteAdmin);
adminRoutes.delete("/soft/:id", softDeleteAdmin);

export default adminRoutes;
