import * as orderModel from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    const { user_id, total_price, status } = req.body;
    const newOrder = await orderModel.createOrder({
      user_id,
      total_price,
      status,
    });
    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({ error: "Server error while creating order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error("Error fetching order:", err.message);
    res.status(500).json({ error: "Server error while fetching order" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await orderModel.updateOrderStatus(id, status);
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Error updating order:", err.message);
    res.status(500).json({ error: "Server error while updating order" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await orderModel.deleteOrder(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (err) {
    console.error("Error deleting order:", err.message);
    res.status(500).json({ error: "Server error while deleting order" });
  }
};
