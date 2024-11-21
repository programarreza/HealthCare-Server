import { Router } from "express";
import { getAllDoctors, getSingleDoctor } from "./doctor.controller";

const doctorRoutes = Router();

doctorRoutes.get("/", getAllDoctors);
doctorRoutes.get("/:id", getSingleDoctor);

export default doctorRoutes;
