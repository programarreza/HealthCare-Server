import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
} from "./appointment.controller";
import { createAppointmentValidationSchema } from "./appointment.validation";

const appointmentRoutes = Router();

appointmentRoutes.post(
  "/",
  validateRequest(createAppointmentValidationSchema),
  auth(UserRole.PATIENT),
  createAppointment
);

appointmentRoutes.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  getMyAppointments
);

appointmentRoutes.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  getAllAppointments
);

export default appointmentRoutes;
