import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT || 8080;

export const JWT_SECRET = process.env.JWT_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD!;
export const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL!;
