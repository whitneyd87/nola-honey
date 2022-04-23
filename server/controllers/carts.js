const Cart = require("../models/cart");
const Item = require("../models/item");
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.addItem = async (req, res) => {
  try {
    const { _id, orderInventory } = req.body;
    const itemID = mongoose.Types.ObjectId(_id);
    const cartID = req.session.cartID ?? false;
    const username = req.session.passport.user;
    const orderInv = orderInventory.map((inv) => {
      inv.quantity = parseInt(inv.quantity);
      return inv;
    });
    let myCart;

    // if no cartID, create cart and add item
    if (!cartID) {
      myCart = new Cart({
        items: [
          {
            _id: itemID,
            orderInventory: orderInv,
          },
        ],
      });
      // set cartID
      const [currentUser] = await User.find({ username });
      currentUser
        ? currentUser.cart.push({ _id: myCart._id })
        : (req.session.cartID = myCart._id);
      await currentUser.save();
    } else {
      let updateInventory = {};
      myCart = await Cart.findById(cartID);
      const currentInventory = myCart.items.filter(
        (item) => item._id.toString() === itemID.toString()
      );
      if (currentInventory.length !== 0) {
        const updateQty = currentInventory[0].orderInventory
          .filter((inv) => inv.size === orderInv[0].size)
          .map((inv) => inv.quantity + orderInv[0].quantity);
        updateInventory = {
          size: orderInv[0].size,
          quantity: updateQty[0],
        };
      }

      await myCart.updateOne([
        {
          $set: {
            items: {
              $cond: [
                { $in: [itemID, "$items._id"] },
                {
                  $map: {
                    input: "$items",
                    in: {
                      $cond: [
                        { $eq: [itemID, "$$this._id"] },
                        {
                          $mergeObjects: [
                            "$$this",
                            {
                              $cond: [
                                {
                                  $in: [
                                    updateInventory.size,
                                    "$$this.orderInventory.size",
                                  ],
                                },
                                {
                                  orderInventory: {
                                    $map: {
                                      input: "$$this.orderInventory",
                                      in: {
                                        $cond: [
                                          {
                                            $eq: [
                                              updateInventory.size,
                                              "$$this.size",
                                            ],
                                          },
                                          updateInventory,
                                          "$$this",
                                        ],
                                      },
                                    },
                                  },
                                },
                                {
                                  orderInventory: {
                                    $concatArrays: [
                                      "$$this.orderInventory",
                                      orderInv,
                                    ],
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        "$$this",
                      ],
                    },
                  },
                },
                {
                  $concatArrays: [
                    "$items",
                    [
                      {
                        _id: itemID,
                        orderInventory: orderInv,
                      },
                    ],
                  ],
                },
              ],
            },
          },
        },
      ]);
    }
    // update most recent item
    myCart.mostRecentItem = { _id: itemID, orderInventory: orderInv };

    // save cart
    await myCart.save();
    res.send({ success: "Item added to cart!" });
  } catch (err) {
    console.error(err);
  }
};

module.exports.myCart = async (req, res) => {
  const [user] = await User.find({ username: req.session.passport.user });
  const cartID = req.session.cartID ?? user.cart[0]._id;
  try {
    const myCart = await Cart.findById(cartID)
      .populate({
        path: "items",
        populate: {
          path: "_id",
        },
      })
      .populate("_id");
    const itemID = myCart.mostRecentItem[0]._id;
    const item = await Item.findById(itemID);
    const cartItems = myCart.items;
    const items = await Item.find({});
    const itemsPreview = items.splice(1, 4);
    const orderInventory = myCart.mostRecentItem[0].orderInventory;
    res.send({
      item: item,
      cartItems: cartItems,
      orderInventory: orderInventory,
      itemsPreview: itemsPreview,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.updateCart = async (req, res) => {
  try {
    const cartID = req.session.cartID;
    const { updatedItems } = req.body;
    const items = updatedItems.map((item) => {
      item._id = item._id._id;
      return item;
    });
    const myCart = await Cart.findByIdAndUpdate(cartID, {
      items,
    })
      .populate({
        path: "items",
        populate: {
          path: "_id",
        },
      })
      .populate("_id");
    await myCart.save();
    res.send({ items: myCart.items });
  } catch (err) {
    console.error(err);
  }
};

module.exports.deleteCartItem = async (req, res) => {
  try {
    console.log(req.params);
    const { id, size } = req.params;
    const _id = id;
    const cartID = req.session.cartID;
    const myCart = await Cart.findById(cartID);
    if (!size)
      await myCart.updateOne({
        $pull: { items: { _id: { $in: _id } } },
      });
    else
      await myCart.updateOne(
        { items: { _id: { $in: _id } } },
        { $pull: { inventory: { size: { $in: size } } } }
      );
    await myCart.save();
    res.send({ redirect: true });
  } catch (err) {
    console.error(err);
  }
};
