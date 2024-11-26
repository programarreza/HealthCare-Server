import { Router } from "express";
import { createSchedule } from "./schedule.controller";

const scheduleRoutes = Router();

scheduleRoutes.post("/", createSchedule);

export default scheduleRoutes;
