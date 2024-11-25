import { Router } from "express";
import { getAllPatients, getSinglePatient } from "./patient.controllers";

const patientRoutes = Router();

patientRoutes.get("/", getAllPatients);
patientRoutes.get("/:id", getSinglePatient);

export default patientRoutes;
