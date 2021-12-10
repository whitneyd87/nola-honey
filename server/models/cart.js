const mongoose = require("mongoose");
const { Schema } = mongoose;

const SelectionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  orderInventory: [
    {
      _id: false,
      size: {
        type: String,
        enum: [null, "XS", "S", "M", "L", "XL"],
      },
      quantity: Number,
    },
  ],
});

const CartSchema = new Schema({
  items: {
    type: [SelectionSchema],
  },
  mostRecentItem: {
    type: [SelectionSchema],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", CartSchema);
