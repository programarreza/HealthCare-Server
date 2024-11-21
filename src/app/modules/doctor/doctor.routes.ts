import { Router } from "express";
import {
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  softDeleteDoctor,
  updateDoctor,
} from "./doctor.controller";

const doctorRoutes = Router();

doctorRoutes.get("/", getAllDoctors);
doctorRoutes.get("/:id", getSingleDoctor);
doctorRoutes.delete("/soft/:id", softDeleteDoctor);
doctorRoutes.delete("/:id", deleteDoctor);
doctorRoutes.patch("/:id", updateDoctor);

export default doctorRoutes;
