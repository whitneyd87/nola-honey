const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const items = require("../controllers/items");
const carts = require("../controllers/carts");

router.route("/").get(catchAsync(items.index));
router
  .route("/:id")
  .get(catchAsync(items.itemDetails))
  .post(catchAsync(carts.addItem));
router.route("/:id/addtocart").get(catchAsync(carts.itemDetails));
router
  .route("/mycart")
  .get(catchAsync(carts.myCart))
  .put(catchAsync(carts.updateCart));
router.route("/mycart/:id/:sizeID").delete(catchAsync(carts.deleteCartItem));

module.exports = router;
