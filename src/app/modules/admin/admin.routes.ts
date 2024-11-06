import { Router } from "express";
import { getAllAdmin } from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/", getAllAdmin);

export default adminRoutes;
