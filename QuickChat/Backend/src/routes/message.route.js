import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUserForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectedRoute, getUserForSidebar);

messageRouter.get("/:id", protectedRoute, getMessages);

messageRouter.put("/mark/:id", protectedRoute, markMessageAsSeen);

messageRouter.post("/send/:id", protectedRoute, sendMessage);

export default messageRouter;
