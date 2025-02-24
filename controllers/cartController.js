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
  const user_id = req.user.user_id;
  const itemData = req.body;
  try {
    const cartItem = await cartModel.addOrUpdateCartItem(user_id, itemData);
    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (err) {
    console.error("Error adding item to cart:", err.message);
    res.status(500).json({ error: "Server error while adding item to cart" });
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
