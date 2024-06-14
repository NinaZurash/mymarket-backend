import { Router } from "express";
import {
  requestPasswordReset,
  resetPassword,
  signIn,
  signup,
  verifyEmail,
} from "../controllers/auth";
import { validate } from "../middlewares/auth";
import {
  requestPasswordResetSchema,
  resetPasswordSchema,
  signInSchema,
  signupSchema,
} from "../schemas/auth";

export const authRoutes: Router = Router();

authRoutes.post("/signup", validate(signupSchema), signup);
authRoutes.post("/signin", validate(signInSchema), signIn);
authRoutes.post("/verify-email", verifyEmail);
authRoutes.post(
  "/request-password-reset",
  validate(requestPasswordResetSchema),
  requestPasswordReset
);
authRoutes.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);
// authRoutes.post("/change-password", authenticateUser, changePassword);
