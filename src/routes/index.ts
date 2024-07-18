import { Router } from "express";
import { authRoutes } from "./auth";
import { verifyToken } from "../middlewares/auth";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
