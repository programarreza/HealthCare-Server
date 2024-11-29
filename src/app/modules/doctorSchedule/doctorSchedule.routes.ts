import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import {
  createDoctorSchedule,
  deleteMyDoctorSchedule,
  getMyDoctorSchedule,
} from "./doctorSchedule.controller";

const doctorScheduleRoutes = Router();

doctorScheduleRoutes.post("/", auth(UserRole.DOCTOR), createDoctorSchedule);

doctorScheduleRoutes.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  getMyDoctorSchedule
);

doctorScheduleRoutes.delete(
  "/my-schedule/:id",
  auth(UserRole.DOCTOR),
  deleteMyDoctorSchedule
);

export default doctorScheduleRoutes;
