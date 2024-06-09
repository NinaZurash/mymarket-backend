import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { prisma } from "./lib/prisma";

dotenv.config();
const app = express();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.get("/status", (_, res) => {
  res.status(200).json({ message: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
