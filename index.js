import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import productQuantityRoutes from "./routes/productQuantityRoutes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/products/quantity", productQuantityRoutes);

app.get("/", (req, res) => {
  res.send("M-Safi Farm API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
