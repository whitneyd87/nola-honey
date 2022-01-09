const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: String,
  title: String,
  comment: String,
  author: String,
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  date: Date,
});

module.exports = mongoose.model("Review", ReviewSchema);
