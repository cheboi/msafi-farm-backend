import pool from "../config/db.js";

// Create a new order
export const createOrder = async (
  user_id,
  total_price,
  order_status = "pending",
  items,
  shipping_address,
  billing_address
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const orderQuery = `
      INSERT INTO orders (user_id, total_price, status, shipping_address, billing_address)
      VALUES ($1, $2, $3, $4, $5) RETURNING order_id;
    `;

    const { rows } = await client.query(orderQuery, [
      user_id,
      total_price,
      order_status,
      shipping_address,
      billing_address,
    ]);

    const order_id = rows[0].order_id;

    const orderItemsQuery = `
      INSERT INTO order_items (order_id, product_id, product_name, quantity, product_price)
      VALUES ($1, $2, $3, $4, $5);
    `;

    for (const item of items) {
      await client.query(orderItemsQuery, [
        order_id,
        item.product_id,
        item.product_name,
        item.quantity,
        item.product_price,
      ]);
    }

    await client.query("COMMIT");
    return order_id;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Get all orders
export const getOrders = async () => {
  const query = `
    SELECT o.order_id, o.user_id, o.total_price, o.order_status, o.created_at, 
      json_agg(json_build_object(
        'product_id', oi.product_id,
        'quantity', oi.quantity,
        'product_price', oi.product_price
      )) AS order_items
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    GROUP BY o.order_id;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

// Get orders by user ID
export const getOrdersByUser = async (user_id) => {
  const query = `
    SELECT o.order_id, o.total_price, o.order_status, o.created_at, 
      json_agg(json_build_object(
        'product_id', oi.product_id,
        'quantity', oi.quantity,
        'Product_price', oi.product_price
      )) AS order_items
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.user_id = $1
    GROUP BY o.order_id;
  `;
  const { rows } = await pool.query(query, [user_id]);
  return rows;
};

// Get a single order by ID
export const getOrderById = async (order_id) => {
  const query = `
    SELECT o.order_id, o.total_price, o.order_status, o.created_at, 
      json_agg(json_build_object(
        'product_id', oi.product_id,
        'quantity', oi.quantity,
        'product_price', oi.product_price
      )) AS order_items
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_id = $1
    GROUP BY o.order_id;
  `;
  const { rows } = await pool.query(query, [order_id]);
  return rows[0];
};

// Update order status
export const updateOrderStatus = async (order_id, status) => {
  const query = `UPDATE orders SET order_status = $1 WHERE order_id = $2 RETURNING *;`;
  const { rows } = await pool.query(query, [status, order_id]);
  return rows[0];
};

// Delete an order
export const deleteOrder = async (order_id) => {
  const query = `DELETE FROM orders WHERE order_id = $1 RETURNING *;`;
  const { rows } = await pool.query(query, [order_id]);
  return rows[0];
};

// Track an order
export const trackOrder = async (order_id) => {
  const query = `
    SELECT order_id, user_id, total_price, order_status, created_at
    FROM orders WHERE order_id = $1;
  `;
  const { rows } = await pool.query(query, [order_id]);
  return rows[0];
};
