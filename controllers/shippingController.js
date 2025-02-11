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
    res
      .status(201)
      .json({
        message: "Shipping created successfully",
        shipping: shippingRecord,
      });
  } catch (err) {
    console.error("Error creating shipping:", err.message);
    res.status(500).json({ error: "Server error while creating shipping" });
  }
};
