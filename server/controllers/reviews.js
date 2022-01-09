const Item = require("../models/item.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  try {
    const { rating, title, comment, itemID } = req.body;
    const date = new Date();
    const author = req.session.user ?? "guest";
    const item = await Item.findById(itemID)
      .populate({
        path: "reviews",
        populate: {
          path: "_id",
        },
      })
      .populate("_id");
    const review = new Review({ rating, title, comment, author, itemID, date });
    await review.save();
    item.reviews.push(review);
    await item.save();
    // req.flash("success", "Created new review!");
    // res.redirect(`/items/${item._id}`);
    res.send({ reviews: item.reviews });
  } catch (err) {
    console.error(err);
  }
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
