import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import {
  createSchedule,
  deleteSchedule,
  getAllSchedule,
  getSingleSchedule,
} from "./schedule.controller";

const scheduleRoutes = Router();

scheduleRoutes.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  createSchedule
);

scheduleRoutes.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  getAllSchedule
);

scheduleRoutes.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  getSingleSchedule
);

scheduleRoutes.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteSchedule
);

export default scheduleRoutes;
