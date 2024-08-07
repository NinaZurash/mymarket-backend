import express, { Express } from "express";
import morgan from "morgan";
import { rootRouter } from "./routes";
import { PORT } from "./config";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", rootRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("application running successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
