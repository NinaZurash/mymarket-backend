import { Request, Response } from "express";
import { prismaClient } from "../lib/prisma";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

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

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

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
