import { Request, Response } from "express";
import { prismaClient } from "../lib/prisma";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "../utils/sendVerificationEmail";

// Signup
export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await prismaClient.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashSync(password, 10),
        name,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });
    const token = await generateVerificationToken(user.id);

    await sendVerificationEmail(email, token);

    await prismaClient.user.update({
      where: { email: email },
      data: { emailVerificationCode: token },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// SignIn
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Check if the user already exists
    const user = await prismaClient.user.findFirst({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    if (user.password && !compareSync(password, user.password)) {
      throw Error("Invalid password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Verify Email
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET);

    if (typeof decoded !== "object" || !("userId" in decoded)) {
      return res.status(400).json({ error: "Invalid token" });
    }

    await prismaClient.user.update({
      where: { id: (decoded as any).userId },
      data: { emailVerified: new Date() },
    });

    res.json({ message: " Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Request Password Reset
export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = generateVerificationToken(user.id);

    await sendVerificationEmail(email, token);

    await prismaClient.user.update({
      where: { email: email },
      data: { resetPasswordToken: token },
    });

    res.json({ message: "Password reset token sent to email" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as {
      userId: string;
    };

    const user = await prismaClient.user.findFirst({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }

    await prismaClient.user.update({
      where: { id: decoded.userId },
      data: { password: hashSync(newPassword, 10) },
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Change Password

// export const changePassword = async (req: Request, res: Response) => {
//   const { currentPassword, newPassword } = req.body;
//   const user = req.user;

//   if (!user) {
//     return res.status(400).json({ error: "User not found" });
//   }
//   try {
//     const existingUser = await prismaClient.user.findUnique({
//       where: { id: user.id },
//     });

//     if (!existingUser) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Check if current password matches
//     if (!currentPassword || !newPassword) {
//       return res
//         .status(400)
//         .json({ error: "Current password and new password are required" });
//     }

//     if (!(await compareSync(currentPassword, existingUser.password || ""))) {
//       return res.status(400).json({ error: "Current password is incorrect" });
//     }

//     await prismaClient.user.update({
//       where: { id: user.id },
//       data: {
//         password: hashSync(newPassword, 10),
//       },
//     });

//     res.json({ message: "Password changed successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };
