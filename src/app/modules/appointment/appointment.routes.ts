import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import { createAppointment } from "./appointment.controller";

const appointmentRoutes = Router();

appointmentRoutes.post("/", auth(UserRole.PATIENT), createAppointment);

export default appointmentRoutes;
