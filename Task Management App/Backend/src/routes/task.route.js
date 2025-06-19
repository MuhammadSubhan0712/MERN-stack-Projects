import express from "express";
import {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
} from "../controllers/task.controller.js";
import { protect } from "../controllers/auth.controller.js";

const router = express.Router();

router.use(protect);

router.post("/createTask", createTask);
router.get("/:id/getTask", getTask);
router.get("/getAllTask", getAllTasks);
router.patch("/:id/updateTask", updateTask);
router.delete("/:id/deleteTask", deleteTask);

export default router;
