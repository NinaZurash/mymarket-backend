import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from "../config";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateVerificationToken = (userId: string): string => {
  const token = jwt.sign(
    {
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour (adjust as needed)
    },
    JWT_SECRET
  );
  return token;
};
export const sendVerificationEmail = async (
  email: string,
  verificationCode: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: NODEMAILER_EMAIL,
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};
