import express from "express";
import {signup, login, logout, protect, getMe} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.use(protect);

export default router;
