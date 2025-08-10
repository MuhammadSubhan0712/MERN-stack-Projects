import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/db/index.js";
import userRouter from "./src/routes/user.route.js";
import messageRouter from "./src/routes/message.route.js";
import { Server } from "socket.io";

dotenv.config();
// Create express app and http server:
const app = express();
const server = http.createServer(app);

// Initialize socket.io server:
export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5000",
      "https://chat-app-frontend-one-jet.vercel.app",
    ],
  },
  method: ["GET", "POST", "PUT"],
  credentials: true,
});

const vercelHandler = async (req, res) => {
  app(req, res);
};

// Store online users:
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler:
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users to all connected clients:
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware setup:
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Route setup
app.use("/api/status", (req, res) => res.send("Server is live 🛑LIVE 🎞️🎥"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MONGODB:
await connectDB().catch((error) => {
  console.log("❌ MONGODB connection error", error, "❌");
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () =>
    console.log("📡 Server is running on port: 🔗", PORT, "✅")
  );
}
// Export server for Vercel:
export default server;
