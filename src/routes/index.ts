import { Router } from "express";
import { authRoutes } from "./auth";
import { chatRoutes } from "./chat";

export const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/chat", chatRoutes);
