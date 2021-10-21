const Cart = require("../models/cart");
const Item = require("../models/item");

const addCartItems = (data, myCart) => {
  const newItem = data;
  //Update quantity of existing item in cart
  if (
    myCart.items.some(
      (item) => item._id == newItem[0]._id && item.size == newItem[0].size
    )
  ) {
    myCart.items.map((item, i) =>
      item._id === newItem[0]._id
        ? (myCart.items[i].quantity =
            parseInt(myCart.items[i].quantity) +
            parseInt(data.items[0].quantity))
        : myCart.items[i]
    );
    //Add new item to cart
  } else myCart.items.push(newItem[0]);
  return myCart;
};

module.exports.addItem = async (req, res) => {
  try {
    const item = req.body;
    const cartID = req.session.cartID;
    let myCart;

    // if no cartID, create cart and add item
    if (!cartID) myCart = new Cart({ items: [item] });

    // else find cart and add item
    myCart = await Cart.findById(cartID);
    await addCartItems([item], myCart);

    // set cartID
    req.session.cartID = myCart._id;

    // update most recent item
    myCart.mostRecentItem = item;

    // save cart
    await myCart.save();
    res.send({ success: "Item added to cart!" });
  } catch (err) {
    console.error(err);
  }
};

module.exports.itemDetails = async (req, res) => {
  const { id } = req.params;
  const cartID = req.session.cartID;
  try {
    const myCart = await Cart.findById(cartID);
    const items = await Item.find({});
    const item = await Item.findById(id);
    const itemsPreview = items.splice(1, 4);
    const itemDetails = myCart.mostRecentItem;
    res.send({
      item: item,
      size: itemDetails.size,
      quantity: itemDetails.quantity,
      itemsPreview: itemsPreview,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.myCart = async (req, res) => {
  try {
    const cartID = req.session.cartID;
    const myCart = await Cart.findById(cartID);
    const items = myCart.items;
    res.send({ items: items });
  } catch (err) {
    console.error(err);
  }
};

module.exports.updateCart = async (req, res) => {
  try {
    const cartID = req.session.cartID;
    const { updatedItems } = req.body;
    const resetItemIDs = updatedItems.map((item) => {
      item._id = item._id._id;
      return item;
    });
    const myCart = await Cart.findByIdAndUpdate(cartID, {
      items: resetItemIDs,
    });
    await myCart.save();
    res.send({ success: "Cart successfully updated!" });
  } catch (err) {
    console.error(err);
  }
};

module.exports.deleteCartItem = async (req, res) => {
  try {
    const { deletedItem } = req.body;
    const { _id, size } = deletedItem;
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
