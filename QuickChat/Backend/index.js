import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/db/index.js";
import userRouter from "./src/routes/user.route.js";

dotenv.config();
// Create express app and http server:
const app = express();
const server = http.createServer(app);

// Middleware setup:
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Route setup
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);

// Connect to MONGODB:
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log("📡 Server is running on port: 🔗", PORT, "✅")
);
