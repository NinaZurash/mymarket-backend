import { Router } from "express";
import { authRoutes } from "./auth";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
