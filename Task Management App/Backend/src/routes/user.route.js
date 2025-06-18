import express from "express";
import authController from "../controllers/auth.controller.js";


const router = express.Router();

router.use(authController.protect);


router
.route("/")
.post(authController.signup)
.post(taskController.createTask);


module.exports = router ;