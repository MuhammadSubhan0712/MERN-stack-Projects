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

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
