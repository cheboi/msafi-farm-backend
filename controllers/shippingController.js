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
