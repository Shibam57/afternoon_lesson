
const express = require("express");

const {
  createOrder,
  getAllOrders
} = require("../controllers/orderController.js");


const router = express.Router();

// POST order
router.post("/", createOrder);

// GET all orders
router.get("/", getAllOrders);

module.exports = router;
