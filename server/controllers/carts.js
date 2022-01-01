const Cart = require("../models/cart");
const Item = require("../models/item");
const mongoose = require("mongoose");

module.exports.addItem = async (req, res) => {
  try {
    const { _id, orderInventory } = req.body;
    console.log(orderInventory);
    const itemID = mongoose.Types.ObjectId(_id);
    const cartID = req.session.cartID ?? false;
    let myCart;

    // if no cartID, create cart and add item
    if (!cartID) {
      myCart = new Cart({
        items: [
          {
            _id: itemID,
            orderInventory: orderInventory,
          },
        ],
      });
      // set cartID
      req.session.cartID = myCart._id;
    } else {
      myCart = await Cart.findById(cartID);
      const currentInventory = myCart.items.filter(
        (item) => item._id === itemID && item.size === orderInventory[0].size
      );
      // console.log(currentInventory);
      const updateQty =
        currentInventory.length === 0
          ? parseInt(orderInventory[0].quantity)
          : currentInventory[0].orderInventory[0].quantity +
            parseInt(orderInventory[0].quantity);
      const updateInventory = {
        size: orderInventory[0].size,
        quantity: updateQty,
      };

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
                                      [updateInventory],
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
                        orderInventory: [updateInventory],
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
    myCart.mostRecentItem = { _id: itemID, orderInventory };

    // save cart
    await myCart.save();
    res.send({ success: "Item added to cart!" });
  } catch (err) {
    console.error(err);
  }
};

module.exports.itemDetails = async (req, res) => {
  const cartID = req.session.cartID;
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

module.exports.myCart = async (req, res) => {
  try {
    // const cartID = req.session.cartID;
    // console.log(cartID);
    // const myCart = await Cart.findById(cartID);
    // console.log(myCart);
    // const items = myCart.items;
    res.send({ items: "hello" });
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
    const { deletedItem } = req.body;
    console.log(req.body);
    // const { _id, size } = deletedItem;
    // const cartID = req.session.cartID;
    // const myCart = await Cart.findById(cartID);
    // if (!size)
    //   await myCart.updateOne({
    //     $pull: { items: { _id: { $in: _id } } },
    //   });
    // else
    //   await myCart.updateOne(
    //     { items: { _id: { $in: _id } } },
    //     { $pull: { inventory: { size: { $in: size } } } }
    //   );
    // await myCart.save();
    res.send({ redirect: true });
  } catch (err) {
    console.error(err);
  }
};
