import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server is running on port 5000"));
