import {
  createOrder,
  getOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  trackOrder,
} from "../models/order.js";

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { cart_items, shipping_address, billing_address } = req.body;

    if (!cart_items || cart_items.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }
    if (!shipping_address || !billing_address) {
      return res
        .status(400)
        .json({ message: "Shipping and billing addresses are required!" });
    }

    const total_price = cart_items.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0
    );

    const order_id = await createOrder(
      user_id,
      total_price,
      "pending",
      cart_items,
      shipping_address,
      billing_address
    );

    res.status(201).json({ message: "Order placed successfully!", order_id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

// Get  orders
export const fetchOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error while fetching orders" });
  }
};

// Get user orders
export const fetchUserOrders = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const orders = await getOrdersByUser(user_id);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Server error while fetching user orders" });
  }
};

// Get a single order by ID
export const fetchOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await getOrderById(order_id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Server error while fetching order" });
  }
};

// Update order status
export const modifyOrderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    if (
      !["pending", "processed", "shipped", "delivered", "cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const updatedOrder = await updateOrderStatus(order_id, status);
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order status updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Server error while updating order status" });
  }
};

// Delete an order Admin Only
export const removeOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const deletedOrder = await deleteOrder(order_id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Server error while deleting order" });
  }
};

export const trackOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await trackOrder(order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      order_id: order.id,
      user_id: order.user_id,
      total_price: order.total_price,
      status: order.order_status,
      created_at: order.created_at,
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    res.status(500).json({ error: "Server error while tracking order" });
  }
};
