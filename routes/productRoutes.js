import express from "express";
import * as productController from "../controllers/productController.js";
// import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// router.use(verifyToken);

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get('/search', productController.searchProducts);

export default router;
