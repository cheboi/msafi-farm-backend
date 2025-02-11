import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import productRoutes from "./routes/productRoutes.js";
import productQuantityRoutes from "./routes/productQuantityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/products/quantity", productQuantityRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/shipping", shippingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
