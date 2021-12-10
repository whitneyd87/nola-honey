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
    console.log(order);
    await order.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports.editOrder = async (req, res) => {};
module.exports.cancelOrder = async (req, res) => {};
