import { Router } from "express";
import {
  deleteAdmin,
  getAllAdmin,
  getSingleAdminById,
  updateAdmin,
} from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/", getAllAdmin);
adminRoutes.get("/:id", getSingleAdminById);
adminRoutes.patch("/:id", updateAdmin);
adminRoutes.delete("/:id", deleteAdmin);

export default adminRoutes;
