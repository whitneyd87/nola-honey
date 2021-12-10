const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const InventorySchema = new Schema({
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL"],
  },
  quantity: Number,
});

const ItemSchema = new Schema({
  title: String,
  category: String,
  department: String,
  itemType: String,
  description: String,
  image: {
    type: [ImageSchema],
  },
  price: Number,
  inventory: {
    type: [InventorySchema],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("Item", ItemSchema);
