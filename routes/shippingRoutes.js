import express from "express";
import * as shippingController from "../controllers/shippingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, shippingController.createShipping);
router.get("/:id", authMiddleware, shippingController.getShippingById);
router.get(
  "/order/:order_id",
  authMiddleware,
  shippingController.getShippingByOrderId
);
router.put("/:id", authMiddleware, shippingController.updateShipping);
router.delete("/:id", authMiddleware, shippingController.deleteShipping);

export default router;
