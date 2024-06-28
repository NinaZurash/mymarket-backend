import { Router } from "express";
import {
  changePassword,
  requestPasswordReset,
  resetPassword,
  signIn,
  signup,
  verifyEmail,
} from "../controllers/auth";
import { authenticateUser, validate } from "../middlewares/auth";
import {
  changePasswordSchema,
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
authRoutes.post(
  "/change-password",
  authenticateUser,
  validate(changePasswordSchema),
  changePassword
);
