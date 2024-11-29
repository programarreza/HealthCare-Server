import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import { createSchedule, getAllSchedule } from "./schedule.controller";

const scheduleRoutes = Router();

scheduleRoutes.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  createSchedule
);

scheduleRoutes.get(
  "/",
  auth(UserRole.DOCTOR),
  getAllSchedule
);

export default scheduleRoutes;
