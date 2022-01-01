const mongoose = require("mongoose");
const { Schema } = mongoose;
const AddressSchema = require("../models/address");

const OrderDetailsSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "Item" },
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

const PaymentMethodSchema = new Schema({
  _id: false,
  cardName: String,
  vendor: {
    type: String,
    enum: ["VISA", "MASTERCARD", "AMERICAN EXPRESS", "PAYPAL", "DISCOVER"],
  },
  cardNo: Number,
  cvv: String,
  expiration: Date,
  cardID: String,
});

const OrderSchema = new Schema({
  items: [{ type: OrderDetailsSchema }],
  billing: [{ type: AddressSchema }],
  shipping: [{ type: AddressSchema }],
  paymentMethod: [{ type: PaymentMethodSchema }],
  orderDate: Date,
  orderStatus: [
    { type: String, enum: ["Placed", "Shipped", "Delivered", "Cancelled"] },
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
