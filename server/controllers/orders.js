const Order = require("../models/order");
const Item = require("../models/item");
const User = require("../models/user");

module.exports.orderHistory = async (req, res) => {
  const orders = await Order.find({});
  res.send({ orders });
};

module.exports.createOrder = async (req, res) => {
    const {order, item} = req.body;
    const order = new Order({
        item: item,
        quantity: order.ey

    });
};
module.exports.editOrder = async (req, res) => {};
module.exports.cancelOrder = async (req, res) => {};
