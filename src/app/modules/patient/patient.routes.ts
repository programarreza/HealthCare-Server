import { Router } from "express";
import {
  getAllPatients,
  getSinglePatient,
  updatePatient,
} from "./patient.controllers";

const patientRoutes = Router();

patientRoutes.get("/", getAllPatients);
patientRoutes.get("/:id", getSinglePatient);
patientRoutes.patch("/:id", updatePatient);

export default patientRoutes;
