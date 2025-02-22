import * as productModel from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productModel.createProduct(product);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ error: "Server error while creating product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Server error while fetching products" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ error: "Server error while fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const updatedProduct = await productModel.updateProduct(id, product);
    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ error: "Server error while updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productModel.deleteProduct(id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ error: "Server error while deleting product" });
  }
};

export const searchProducts = async (req, res) => {
  const { q } = req.query;
  if (!q)
    return res
      .status(400)
      .json({ error: "Missing search query parameter (q)" });
  try {
    const products = await productModel.searchProducts(q);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error searching products:", err.message);
    res.status(500).json({ error: "Server error while searching products" });
  }
};
