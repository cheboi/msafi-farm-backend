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
