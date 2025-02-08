import pool from "../config/db.js";

export const createProduct = async (product) => {
  const { name, category, description, price, stock } = product;
  const result = await pool.query(
    "INSERT INTO products (name, category, description, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, category, description, price, stock]
  );
  return result.rows[0];
};

export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateProduct = async (id, product) => {
  const { name, category, description, price, stock } = product;
  const result = await pool.query(
    "UPDATE products SET name = $1, category = $2, description = $3, price = $4, stock = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *",
    [name, category, description, price, stock, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const searchProducts = async (query) => {
  const sqlQuery = `
    SELECT * FROM products
    WHERE name ILIKE $1 OR category ILIKE $1 OR description ILIKE $1
  `;
  const values = [`%${query}%`];
  const result = await pool.query(sqlQuery, values);
  return result.rows;
};
