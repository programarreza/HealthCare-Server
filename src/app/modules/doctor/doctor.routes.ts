import { Router } from "express";
import {
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  softDeleteDoctor,
} from "./doctor.controller";

const doctorRoutes = Router();

doctorRoutes.get("/", getAllDoctors);
doctorRoutes.get("/:id", getSingleDoctor);
doctorRoutes.delete("/soft/:id", softDeleteDoctor);
doctorRoutes.delete("/:id", deleteDoctor);

export default doctorRoutes;
