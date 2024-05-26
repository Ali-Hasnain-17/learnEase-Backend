import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { isAuth } from "./middlewares/isAuth.js";

import { Server } from "socket.io";

const io = new Server(5001);

io.on("connection", (socket) => {
  socket.on("message-send", (data) => {
    socket.broadcast.emit("message-receive", data);
  });
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(5000, () => console.log("Server is running on port 5000"));
