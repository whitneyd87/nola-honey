const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionSchema = new Schema({
  cookie: Schema.Types.Mixed,
  expires: Date,
  myCart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
});

module.exports = mongoose.model("Session", SessionSchema);
