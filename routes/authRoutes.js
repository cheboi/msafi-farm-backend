import express from "express";
import { signup, signin, signout } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", authMiddleware, signout);

export default router;
