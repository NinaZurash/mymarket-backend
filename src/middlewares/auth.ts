import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    console.log(error?.details[0].message);
    if (error) {
      return res.status(400).send(error?.details[0].message);
    }
    next();
  };
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }

    next();
  });
};
