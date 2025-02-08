import express from "express";
import * as cartController from "../controllers/cartController.js";
// import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// router.use(verifyToken);
router.post("/item", cartController.addItemToCart);
router.get("/", cartController.getCart);

export default router;
