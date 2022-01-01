const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const orders = require("../controllers/orders");

router
  .route("/")
  .get(catchAsync(orders.orderHistory))
  .put(catchAsync(orders.createOrder));
router.route("/:orderID").get(catchAsync(orders.orderDetails));

module.exports = router;
