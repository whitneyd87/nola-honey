const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  price: Number,
  shipping: Number,
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
