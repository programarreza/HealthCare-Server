import { Router } from "express";
import { createAdmin } from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", createAdmin);

export default userRoutes;
