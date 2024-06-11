import { Router } from "express";
import { login } from "../controllers/auth";

export const authRoutes: Router = Router();

authRoutes.get("/login", login);
