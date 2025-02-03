import pool from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const { user_id, total_price, status } = req.body;
    const result = await pool.query(
      `INSERT INTO orders (user_id, total_price, status) 
             VALUES ($1, $2, $3) RETURNING *`,
      [user_id, total_price, status || "pending"]
    );
    res.status(201).json({
      message: "Order created successfully",
      order: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating order", error.message);
    res.status(500).json({ error: "SERVER ERROR WHILE Creating order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM orders WHERE order_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching order:", err.message);
    res.status(500).json({ error: "Server error while fetching order" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE order_id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({
      message: "Order status updated successfully",
      order: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating order:", err.message);
    res.status(500).json({ error: "Server error while updating order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM orders WHERE order_id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting order:", err.message);
    res.status(500).json({ error: "Server error while deleting order" });
  }
};
