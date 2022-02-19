const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
