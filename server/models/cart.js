const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  items: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      quantity: Number,
      size: {
        type: String,
        enum: [null, "xs", "s", "m", "l", "xl"],
      },
    },
  ],
  mostRecentItem: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    quantity: Number,
    size: {
      type: String,
      enum: [null, "xs", "s", "m", "l", "xl"],
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", CartSchema);
