import { Router } from "express";
import {
  deletePatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
} from "./patient.controllers";

const patientRoutes = Router();

patientRoutes.get("/", getAllPatients);
patientRoutes.get("/:id", getSinglePatient);
patientRoutes.patch("/:id", updatePatient);
patientRoutes.delete("/:id", deletePatient);

export default patientRoutes;
