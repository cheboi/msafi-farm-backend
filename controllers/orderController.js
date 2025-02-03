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