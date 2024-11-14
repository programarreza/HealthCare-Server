import { Router } from "express";
import auth from "../../middleware/auth";
import { createAdmin } from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", auth("ADMIN", "SUPER_ADMIN"), createAdmin);

export default userRoutes;
