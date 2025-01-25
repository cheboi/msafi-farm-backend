import * as productQuantityModel from "../models/productQuantity.js";

export const addProductQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity, type } = req.body;
  try {
    const newQuantity = await productQuantityModel.createProductQuantity(
      productId,
      quantity,
      type
    );
    res.status(201).json(newQuantity);
  } catch (err) {
    console.error("Error adding product quantity:", err.message);
    res
      .status(500)
      .json({ error: "Server error while adding product quantity" });
  }
};

export const getProductQuantityHistory = async (req, res) => {
  const { productId } = req.params;
  try {
    const history = await productQuantityModel.getProductQuantityHistory(
      productId
    );
    res.status(200).json(history);
  } catch (err) {
    console.error("Error fetching quantity history:", err.message);
    res
      .status(500)
      .json({ error: "Server error while fetching quantity history" });
  }
};
