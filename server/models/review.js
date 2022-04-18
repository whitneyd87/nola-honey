const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: String,
  title: String,
  comment: String,
  author: String,
  itemID: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  date: Date,
});

module.exports = mongoose.model("Review", ReviewSchema);
