import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import productRoutes from "./routes/productRoutes.js";
import productQuantityRoutes from "./routes/productQuantityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Use Helmet to secure HTTP headers
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/products/quantity", productQuantityRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("M-Safi Farm API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
