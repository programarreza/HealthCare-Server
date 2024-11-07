import { Router } from "express";
import {
  getAllAdmin,
  getSingleAdminById,
  updateAdmin,
} from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/", getAllAdmin);
adminRoutes.get("/:id", getSingleAdminById);
adminRoutes.patch("/:id", updateAdmin);

export default adminRoutes;
