import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { prisma } from "./lib/prisma";
import { rootRouter } from "./routes";

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
