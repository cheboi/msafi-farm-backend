import pool from "../config/db.js";

export const createShipping = async ({
  order_id,
  shipping_address,
  shipping_method,
  shipping_status,
  tracking_number,
}) => {
  const result = await pool.query(
    `INSERT INTO shipping (order_id, shipping_address, shipping_method, shipping_status, tracking_number)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      order_id,
      shipping_address,
      shipping_method,
      shipping_status || "pending",
      tracking_number,
    ]
  );
  return result.rows[0];
};

export const getShippingById = async (shipping_id) => {
  const result = await pool.query(
    `SELECT * FROM shipping WHERE shipping_id = $1`,
    [shipping_id]
  );
  return result.rows[0];
};

export const getShippingByOrderId = async (order_id) => {
  const result = await pool.query(
    `
        SELECT * FROM shipping WHERE order_id = $1`,
    [order_id]
  );
  return result.rows;
};

export const updateShipping = async (shipping_id, updateData) => {
  const {
    shipping_address,
    shipping_method,
    shipping_status,
    tracking_number,
  } = updateData;
  const result = await pool.query(
    `UPDATE shipping SET 
           shipping_address = COALESCE($1, shipping_address),
           shipping_method = COALESCE($2, shipping_method),
           shipping_status = COALESCE($3, shipping_status),
           tracking_number = COALESCE($4, tracking_number),
           updated_at = CURRENT_TIMESTAMP
       WHERE shipping_id = $5
       RETURNING *`,
    [
      shipping_address,
      shipping_method,
      shipping_status,
      tracking_number,
      shipping_id,
    ]
  );
  return result.rows[0];
};

export const deleteShipping = async (shipping_id) => {
  const result = await pool.query(
    `DELETE FROM shipping WHERE shipping_id = $1 RETURNING *`,
    [shipping_id]
  );
  return result.rows[0];
};
