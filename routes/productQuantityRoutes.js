import express from "express";
import * as productQuantityController from "../controllers/productQuantityController.js";

const router = express.Router();

router.post("/:productId", productQuantityController.addProductQuantity);
router.get("/:productId", productQuantityController.getProductQuantityHistory);

export default router;
