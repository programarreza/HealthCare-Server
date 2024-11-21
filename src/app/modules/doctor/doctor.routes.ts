import { Router } from "express";
import { getAllDoctors } from "./doctor.controller";

const doctorRoutes = Router();

doctorRoutes.get("/", getAllDoctors);

export default doctorRoutes;
