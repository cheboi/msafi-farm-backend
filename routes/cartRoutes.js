import express from "express";
import * as cartController from "../controllers/cartController.js";

const router = express.Router();

router.get("/", cartController.getCart);
router.post("/item", cartController.addItemToCart);
router.put("/item/:cart_item_id", cartController.updateCartItem);
router.delete("/item/:cart_item_id", cartController.removeItemFromCart);
router.delete("/", cartController.clearCartItems);

export default router;
