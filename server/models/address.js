const mongoose = require("mongoose");
const { Schema } = mongoose;

const NameSchema = new Schema({
  firstName: String,
  lastName: String,
});

const AddressSchema = new Schema({
  recipient: [NameSchema],
  addressType: {
    type: String,
    enum: ["billing", "shipping"],
  },
  streetNumber: Number,
  roadName: String,
  city: String.length,
  state: String,
  postalCode: Number,
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = mongoose.model("Address", AddressSchema);
