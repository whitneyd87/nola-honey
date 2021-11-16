const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderDetailsSchema = new Schema({
  _id: false,
  item: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  orderInventory: [
    {
      _id: false,
      size: {
        type: String,
        enum: [null, "xs", "s", "m", "l", "xl"],
      },
      quantity: Number,
    },
  ],
});

const PaymentMethodSchema = new Schema({
  _id: Number,
  cardName: String,
  vendor: {
    type: String,
    enum: ["VISA", "MASTERCARD", "EXPRESS", "PAYPAL", "DISCOVER"],
  },
  cardNo: Number,
  cvv: String,
  expiration: Date,
});

const OrderSchema = new Schema({
  customer: [
    {
      type: Schema.Types.uuid,
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
  orderedItems: [{ type: OrderDetailsSchema }],
  orderDate: Date,
  orderStatus: [
    { type: String, enum: ["Placed", "Shipped", "Delivered", "Cancelled"] },
  ],
  paymentMethod: [{ type: PaymentMethodSchema }],
});

module.exports = mongoose.model("Order", OrderSchema);
