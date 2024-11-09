import { Router } from "express";
import { loginUser } from "./auth.controller";

const authRoutes = Router();
authRoutes.post("/login", loginUser);

export default authRoutes;
