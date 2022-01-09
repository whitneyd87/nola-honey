const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const reviews = require("../controllers/reviews");

router
  .route("/")
  .get(catchAsync(reviews.reviewHistory))
  .post(catchAsync(reviews.createReview));
router.route("/:reviewID").get(catchAsync(reviews.reviewDetails));

module.exports = router;
