import pool from "../config/db.js";

export const getCartItemsByUserId = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM cart_items WHERE user_id = $1 ORDER BY added_at DESC`,
    [user_id]
  );
  return result.rows;
};

export const addOrUpdateCartItem = async (user_id, itemData) => {
  const {
    product_id,
    product_name,
    product_description,
    product_price,
    product_image,
    quantity,
  } = itemData;

  const check = await pool.query(
    `SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2`,
    [user_id, product_id]
  );

  if (check.rows.length > 0) {
    // If exists, update the quantity
    const existingItem = check.rows[0];
    const newQuantity = existingItem.quantity + quantity;
    const result = await pool.query(
      `UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP
       WHERE cart_item_id = $2 RETURNING *`,
      [newQuantity, existingItem.cart_item_id]
    );
    return result.rows[0];
  } else {
    // If not, insert a new record
    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, product_name, product_description, product_price, product_image, quantity)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        user_id,
        product_id,
        product_name,
        product_description,
        product_price,
        product_image,
        quantity,
      ]
    );
    return result.rows[0];
  }
};

export const updateCartItemQuantity = async (cart_item_id, quantity) => {
  const result = await pool.query(
    `UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP
     WHERE cart_item_id = $2 RETURNING *`,
    [quantity, cart_item_id]
  );
  return result.rows[0];
};

export const removeCartItem = async (cart_item_id) => {
  const result = await pool.query(
    `DELETE FROM cart_items WHERE cart_item_id = $1 RETURNING *`,
    [cart_item_id]
  );
  return result.rows[0];
};

export const clearCartForUser = async (user_id) => {
  const result = await pool.query(
    `DELETE FROM cart_items WHERE user_id = $1 RETURNING *`,
    [user_id]
  );
  return result.rows;
};
