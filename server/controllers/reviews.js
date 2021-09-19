const Item = require("../models/item.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  const item = await Item.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  item.reviews.push(review);
  await review.save();
  await item.save();
  req.flash("success", "Created new review!");
  res.redirect(`/items/${item._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Item.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/items/${id}`);
};
