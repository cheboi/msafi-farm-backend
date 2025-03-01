import * as cartModel from "../models/cart.js";

export const getCart = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const items = await cartModel.getCartItemsByUserId(user_id);
    res.status(200).json({ items });
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ error: "Server error while fetching cart" });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    if (!req.user || !req.user.user_id) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const user_id = req.user.user_id;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Product ID and quantity are required",
        });
    }

    const newItem = await Cart.create({ user_id, product_id, quantity });

    res
      .status(201)
      .json({ success: true, message: "Item added to cart", data: newItem });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateCartItem = async (req, res) => {
  const { cart_item_id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedItem = await cartModel.updateCartItemQuantity(
      cart_item_id,
      quantity
    );
    res.status(200).json({ message: "Cart item updated", updatedItem });
  } catch (err) {
    console.error("Error updating cart item:", err.message);
    res.status(500).json({ error: "Server error while updating cart item" });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { cart_item_id } = req.params;
  try {
    const removedItem = await cartModel.removeCartItem(cart_item_id);
    res.status(200).json({ message: "Cart item removed", removedItem });
  } catch (err) {
    console.error("Error removing cart item:", err.message);
    res.status(500).json({ error: "Server error while removing cart item" });
  }
};

export const clearCartItems = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const clearedItems = await cartModel.clearCartForUser(user_id);
    res.status(200).json({ message: "Cart cleared", clearedItems });
  } catch (err) {
    console.error("Error clearing cart:", err.message);
    res.status(500).json({ error: "Server error while clearing cart" });
  }
};
