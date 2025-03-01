import express from "express";
import {
  placeOrder,
  fetchOrders,
  fetchOrderById,
  modifyOrderStatus,
  removeOrder,
  trackOrderById,
  fetchUserOrders,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, adminMiddleware, fetchOrders);
router.get("/:order_id", authMiddleware, fetchOrderById);
router.get("/:user_id", authMiddleware, adminMiddleware, fetchUserOrders);
router.patch(
  "/:order_id/status",
  authMiddleware,
  adminMiddleware,
  modifyOrderStatus
);
router.delete("/:order_id", authMiddleware, adminMiddleware, removeOrder);
router.get("/track/:order_id", authMiddleware, trackOrderById);

export default router;
