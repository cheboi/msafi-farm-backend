import express from "express";
import * as shippingController from "../controllers/shippingController.js";
// import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// router.use(verifyToken);

router.post("/", shippingController.createShipping);
router.get("/:id", shippingController.getShippingById);

router.get("/order/:order_id", shippingController.getShippingByOrderId);

router.put("/:id", shippingController.updateShipping);

router.delete("/:id", shippingController.deleteShipping);

export default router;
