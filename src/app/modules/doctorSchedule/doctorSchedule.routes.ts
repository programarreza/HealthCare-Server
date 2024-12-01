import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import {
  createDoctorSchedule,
  deleteMyDoctorSchedule,
  getAllDoctorSchedules,
  getMyDoctorSchedule,
} from "./doctorSchedule.controller";

const doctorScheduleRoutes = Router();

doctorScheduleRoutes.post("/", auth(UserRole.DOCTOR), createDoctorSchedule);

doctorScheduleRoutes.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  getMyDoctorSchedule
);

doctorScheduleRoutes.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  getAllDoctorSchedules
);

doctorScheduleRoutes.delete(
  "/my-schedule/:id",
  auth(UserRole.DOCTOR),
  deleteMyDoctorSchedule
);

export default doctorScheduleRoutes;
