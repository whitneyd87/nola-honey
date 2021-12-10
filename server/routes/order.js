const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const orders = require("../controllers/orders");

router
  .route("/")
  .get(catchAsync(orders.orderHistory))
  .put(catchAsync(orders.createOrder));

module.exports = router;
