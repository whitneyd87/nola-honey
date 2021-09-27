const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderDetailsSchema = new Schema({
  item: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  size: [{ type: String, enum: [null, "xs", "s", "m", "l", "xl"] }],
  quantity: Number,
});

const OrderSchema = new Schema({
  confirmationNo: Schema.Types.Mixed,
  customer: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  billingAddress: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  shippingAddress: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  orderedItems: [{ type: [OrderDetailsSchema] }],
  orderDate: Date,
  orderNumber: Schema.Types.ObjectId,
  orderStatus: [
    { type: String, enum: ["Pending", "Shipped", "Delivered", "Canceled"] },
  ],
  paymentMethod: [
    {
      type: String,
      enum: ["VISA", "MASTERCARD", "EXPRESS", "PAYPAL", "DISCOVER"],
    },
  ],
  paymentMethodID: Number,
});

module.exports = mongoose.model("Order", OrderSchema);
