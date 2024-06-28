import express, { Express } from "express";
import morgan from "morgan";
import { rootRouter } from "./routes";
import { PORT } from "./config";

const app: Express = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
