import pool from "../config/db.js";

export const getCartByUserId = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM shopping_carts WHERE user_id = $1",
    [user_id]
  );
  return result.rows[0];
};

export const createCart = async (user_id) => {
  const result = await pool.query(
    "INSERT INTO shopping_carts (user_id) VALUES ($1) RETURNING *",
    [user_id]
  );
  return result.rows[0];
};

export const getOrCreateCartByUserId = async (user_id) => {
  let cart = await getCartByUserId(user_id);
  if (!cart) {
    cart = await createCart(user_id);
  }
  return cart;
};

export const getCartItemsByCartId = async (cart_id) => {
  const result = await pool.query(
    `SELECT ci.cart_item_id, ci.product_id, ci.quantity, p.name, p.price 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.cart_id = $1`,
    [cart_id]
  );
  return result.rows;
};

export const addCartItem = async (cart_id, product_id, quantity) => {
  const check = await pool.query(
    "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2",
    [cart_id, product_id]
  );
  if (check.rows.length > 0) {
    const existing = check.rows[0];
    const newQuantity = existing.quantity + quantity;
    const result = await pool.query(
      "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE cart_item_id = $2 RETURNING *",
      [newQuantity, existing.cart_item_id]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [cart_id, product_id, quantity]
    );
    return result.rows[0];
  }
};

export const updateCartItemQuantity = async (cart_item_id, quantity) => {
  const result = await pool.query(
    "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE cart_item_id = $2 RETURNING *",
    [quantity, cart_item_id]
  );
  return result.rows[0];
};

export const removeCartItem = async (cart_item_id) => {
  const result = await pool.query(
    "DELETE FROM cart_items WHERE cart_item_id = $1 RETURNING *",
    [cart_item_id]
  );
  return result.rows[0];
};

export const clearCart = async (cart_id) => {
  const result = await pool.query(
    "DELETE FROM cart_items WHERE cart_id = $1 RETURNING *",
    [cart_id]
  );
  return result.rows;
};
