const mongoose = require("mongoose");
const { Schema } = mongoose;

const InventorySchema = new Schema({
  quantity: Number,
  size: {
    type: String,
    enum: [null, "xs", "s", "m", "l", "xl"],
  },
});

const CartSchema = new Schema({
  items: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      inventory: {
        type: [InventorySchema],
      },
    },
  ],
  mostRecentItem: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    inventory: {
      type: [InventorySchema],
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Cart", CartSchema);
