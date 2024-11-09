import { Router } from "express";
import { loginUser, refreshToken } from "./auth.controller";

const authRoutes = Router();
authRoutes.post("/login", loginUser);
authRoutes.post("/refresh-token", refreshToken);

export default authRoutes;
