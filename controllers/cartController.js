import * as cartModel from "../models/cart.js";

export const getCart = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const cart = await cartModel.getOrCreateCartByUserId(user_id);
    const items = await cartModel.getCartItemsByCartId(cart.cart_id);
    res.status(200).json({ cart, items });
  } catch (err) {
    console.error("Error getting cart:", err.message);
    res.status(500).json({ error: "Server error while getting cart" });
  }
};
