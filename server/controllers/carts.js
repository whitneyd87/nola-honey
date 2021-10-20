const Cart = require("../models/cart");
const Item = require("../models/item");

const getCart = async (data, id, Cart) => {
  try {
    let myCart;
    if (id == "undefined" || id == null) {
      //If id is nullish, create new Instance
      myCart = new Cart(data);
    } else {
      // Find existing Instance
      myCart = await Cart.findById(id);
      //Add cart item
      await addCartItems(data, myCart);
    }
    return myCart;
  } catch (err) {
    console.error(err);
  }
};

const addCartItems = (data, myCart) => {
  const newItem = data.items;
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
  const { _id, size, quantity } = req.body;
  const cartID = req.session.cartID;
  //Create of Find Cart
  const myCart = await getCart(
    { items: [{ _id, size, quantity }] },
    cartID,
    Cart
  );
  //Set cartID
  req.session.cartID = myCart._id;
  //Add item data to most recent
  myCart.mostRecentItem = { _id, size, quantity };
  //Save data
  await myCart.save();
  res.send({ success: "Item added to cart!" });
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
    console.log(myCart);
    res.send({ items: null });
  } catch (err) {
    console.error(err.stack);
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
    const { id } = req.params;
    const mySession = await Session.findById(sessionID).populate("myCart");
    const itemDeleted = mySession.myCart.items.filter(
      (item) => String(item._id) !== id
    );
    const myCart = await Cart.findByIdAndUpdate(mySession.myCart, {
      items: itemDeleted,
    });
    console.log(myCart);
    // myCart.save();
    res.send({ redirect: true });
  } catch (err) {
    console.error(err);
  }
};
