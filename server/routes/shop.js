const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const items = require("../controllers/items");
const carts = require("../controllers/carts");

router.route("/").get(catchAsync(items.index));
router.route("/mycart/:sessionID").get(catchAsync(carts.myCart));
router.route("/mycart/edit/:sessionID").put(catchAsync(carts.updateCart));
router
  .route("/:id")
  .get(catchAsync(items.itemDetails))
  .post(catchAsync(carts.addItem));
router.route("/:id/addtocart/:sessionID").get(catchAsync(carts.itemDetails));

module.exports = router;
