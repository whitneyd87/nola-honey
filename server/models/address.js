const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema({
  firstName: String,
  lastName: String,
  streetNo: String,
  city: String,
  state: String,
  zipCode: String,
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

module.exports = mongoose.model("Address", AddressSchema).schema;
