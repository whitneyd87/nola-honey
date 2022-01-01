const Order = require("../models/order");
const Item = require("../models/item");
const User = require("../models/user");

module.exports.orderHistory = async (req, res) => {
  const orders = await Order.find({});
  res.send({ orders });
};

module.exports.createOrder = async (req, res) => {
  try {
    const { items, shipping, billing, paymentMethod } = req.body;
    const orderDate = new Date();
    const orderStatus = "Placed";
    const order = new Order({
      items,
      shipping,
      billing,
      paymentMethod,
      orderDate,
      orderStatus,
    });
    if (req.session.user) order.user = req.session.user;
    const cardNo = [...paymentMethod.cardNo];
    // order.paymentMethod.cardID
    await order.save();
    res.send({ redirect: true, orderID: order._id });
  } catch (err) {
    console.error(err);
  }
};

module.exports.orderDetails = async (req, res) => {
  try {
    const { orderID } = req.params;
    const order = await Order.findById(orderID)
      .populate({
        path: "items",
        populate: {
          path: "_id",
        },
      })
      .populate("_id");
    res.send({ order });
  } catch (err) {
    console.error(err);
  }
};

module.exports.editOrder = async (req, res) => {};
module.exports.cancelOrder = async (req, res) => {};
