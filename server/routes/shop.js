const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const items = require("../controllers/items");
const carts = require("../controllers/carts");
// const { isSignedIn } = require("../middleware.js");

router.route("/").get(catchAsync(items.index));
router
  .route("/:id")
  .get(catchAsync(items.itemDetails))
  .post(catchAsync(carts.addItem));
router.route("/:id/:sessionID").get(catchAsync(carts.itemDetails));
router
  .route("/:id/:sessionID/mycart")
  .get(catchAsync(carts.myCart))
  .put(catchAsync(carts.updateCart))
  .delete(catchAsync(carts.deleteCartItem));

module.exports = router;
