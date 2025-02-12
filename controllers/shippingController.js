import * as shippingModel from "../models/shipping.js";

export const createShipping = async (req, res) => {
  try {
    const {
      order_id,
      shipping_address,
      shipping_method,
      shipping_status,
      tracking_number,
    } = req.body;
    const shippingRecord = await shippingModel.createShipping({
      order_id,
      shipping_address,
      shipping_method,
      shipping_status,
      tracking_number,
    });
    res.status(201).json({
      message: "Shipping created successfully",
      shipping: shippingRecord,
    });
  } catch (err) {
    console.error("Error creating shipping:", err.message);
    res.status(500).json({ error: "Server error while creating shipping" });
  }
};

export const getShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    const shippingRecord = await shippingModel.getShippingById(id);
    if (!shippingRecord) {
      return res.status(404).json({ error: "Shipping not found" });
      res.status(200).json(shippingRecord);
    }
  } catch (err) {
    console.error("Error Fetching shipping record ", err.message);
    res.status(500).json({ error: "Server error while feching record" });
  }
};

export const getShippingByOrderId = async (req, res) => {
  try {
    const { order_id } = req.params;
    const shippingRecords = await shippingModel.getShippingByOrderId(order_id);
    res.status(200).json(shippingRecords);
  } catch (err) {
    console.error("Error fetching shipping records for order:", err.message);
    res.status(500).json({
      error: "Server error while fetching shipping records for order",
    });
  }
};

export const updateShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedShipping = await shippingModel.updateShipping(id, updateData);
    if (!updatedShipping)
      return res.status(404).json({ error: "Shipping record not found" });
    res
      .status(200)
      .json({
        message: "Shipping updated successfully",
        shipping: updatedShipping,
      });
  } catch (err) {
    console.error("Error updating shipping:", err.message);
    res.status(500).json({ error: "Server error while updating shipping" });
  }
};

export const deleteShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShipping = await shippingModel.deleteShipping(id);
    if (!deletedShipping)
      return res.status(404).json({ error: "Shipping record not found" });
    res
      .status(200)
      .json({
        message: "Shipping deleted successfully",
        shipping: deletedShipping,
      });
  } catch (err) {
    console.error("Error deleting shipping:", err.message);
    res.status(500).json({ error: "Server error while deleting shipping" });
  }
};
