import express from "express";
import taskController from "../controllers/task.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.use(authController.protect);

router
.route("/")
.get(taskController.getAllTasks)
.post(taskController.createTask);

router 
.route("/:id")
.get(taskController.getTask)
.patch(taskController.updateTask)
.delete(taskController.deleteTask);

module.exports = router ;