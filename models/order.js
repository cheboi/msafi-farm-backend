
import pool from "../config/db.js";

export const createOrder = async ({ user_id, total_price, status }) => {
  const result = await pool.query(
    `INSERT INTO orders (user_id, total_price, status)
     VALUES ($1, $2, $3) RETURNING *`,
    [user_id, total_price, status || "pending"]
  );
  return result.rows[0];
};

export const getAllOrders = async () => {
  const result = await pool.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  return result.rows;
};

export const getOrderById = async (id) => {
  const result = await pool.query("SELECT * FROM orders WHERE order_id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const updateOrderStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE order_id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

export const deleteOrder = async (id) => {
  const result = await pool.query(
    "DELETE FROM orders WHERE order_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
