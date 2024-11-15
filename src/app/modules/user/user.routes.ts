import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import { createAdmin } from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), createAdmin);

export default userRoutes;
