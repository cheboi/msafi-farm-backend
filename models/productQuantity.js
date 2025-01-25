import pool from "../config/db.js";

export const createProductQuantity = async (productId, quantity, type) => {
  const result = await pool.query(
    "INSERT INTO product_quantities (product_id, quantity, type) VALUES ($1, $2, $3) RETURNING *",
    [productId, quantity, type]
  );
  return result.rows[0];
};

export const getProductQuantityHistory = async (productId) => {
  const result = await pool.query(
    "SELECT * FROM product_quantities WHERE product_id = $1 ORDER BY created_at DESC",
    [productId]
  );
  return result.rows;
};
