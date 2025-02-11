import express from "express";
import * as shippingController from "../controllers/shippingController.js";
import verifyToken from "../middleware/verifyToken.js";

router.post("/", shippingController.createShipping);
