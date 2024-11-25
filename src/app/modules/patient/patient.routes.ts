import { Router } from "express";
import {
  deletePatient,
  getAllPatients,
  getSinglePatient,
  softDeletePatient,
  updatePatient,
} from "./patient.controllers";

const patientRoutes = Router();

patientRoutes.get("/", getAllPatients);
patientRoutes.get("/:id", getSinglePatient);
patientRoutes.patch("/:id", updatePatient);
patientRoutes.delete("/:id", deletePatient);
patientRoutes.delete("/soft/:id", softDeletePatient);

export default patientRoutes;
