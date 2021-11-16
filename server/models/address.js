const mongoose = require("mongoose");
const { Schema } = mongoose;

const NameSchema = new Schema({
  _id: false,
  firstName: String,
  lastName: String,
});

const AddressSchema = new Schema({
  recipient: {
    type: [NameSchema],
  },
  addressType: {
    type: String,
    enum: ["billing", "shipping"],
  },
  streetNumber: String,
  city: String,
  state: String,
  zipCode: Number,
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
