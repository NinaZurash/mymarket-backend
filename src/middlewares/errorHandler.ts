// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ERROR_CODES, ERROR_MESSAGES } from "../errorCodes";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || ERROR_CODES.INTERNAL_SERVER_ERROR;
  const message = ERROR_MESSAGES[statusCode] || err.message;

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message,
    },
  });
};
