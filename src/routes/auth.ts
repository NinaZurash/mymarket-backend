import { Router } from "express";
import { signIn, signup } from "../controllers/auth";
import { validate } from "../middlewares/auth";
import { signInSchema, signupSchema } from "../schemas/auth";
export const authRoutes: Router = Router();

authRoutes.post("/signup", validate(signupSchema), signup);
authRoutes.post("/signin", validate(signInSchema), signIn);
