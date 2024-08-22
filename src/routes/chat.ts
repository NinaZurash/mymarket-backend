import { Router } from "express";
import { authenticateUser } from "../middlewares/auth";

export const chatRoutes: Router = Router();

chatRoutes.get("/", authenticateUser, (req, res) => {
  res.json({ message: "Welcome to the chatroom!" });
});
