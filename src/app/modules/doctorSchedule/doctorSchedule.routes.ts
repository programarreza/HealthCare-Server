import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import { createDoctorSchedule } from "./doctorSchedule.controller";

const doctorScheduleRoutes = Router();

doctorScheduleRoutes.post("/", auth(UserRole.DOCTOR), createDoctorSchedule);

export default doctorScheduleRoutes;
