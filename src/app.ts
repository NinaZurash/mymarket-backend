import express, { Express } from "express";
import morgan from "morgan";
import { rootRouter } from "./routes";
import { PORT } from "./config";
import { errorHandler } from "./middlewares/errorHandler";
import { createServer } from "http";
import { Server } from "socket.io";
import { verifySocketToken } from "./middlewares/auth";

const app: Express = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "*"
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
});

io.use((socket, next) => {
  verifySocketToken(socket, next);
});

const messageHistory: { username: string; content: string }[] = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit("messageHistory", messageHistory);

  socket.on("message", (data: { username: string; content: string }) => {
    const messageData = {
      username: data.username,
      content: data.content,
    };

    messageHistory.push(messageData);

    io.emit("message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", rootRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("application running successfully!");
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
