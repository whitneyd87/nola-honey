const Cart = require("../models/cart");
const Item = require("../models/item");
const Session = require("../models/session");

const findData = async (data, id, dataCollection) => {
  try {
    let myData;
    if (id == "undefined" || id == null) {
      //If id is nullish, create new Instance
      myData = new dataCollection(data);
    } else {
      // Find existing Instance
      myData = await dataCollection.findById(id);
      //Add cart item
      if (dataCollection === Cart) await addCartItems(data, myData);
    }
    return myData;
  } catch (err) {
    console.error(err);
  }
};

const addCartItems = (data, myData) => {
  const newItem = data.items;
  //Update quantity of existing item in cart
  if (
    myData.items.some(
      (item) => item._id == newItem[0]._id && item.size == newItem[0].size
    )
  ) {
    myData.items.map((item, i) =>
      item._id === newItem[0]._id
        ? (myData.items[i].quantity =
            parseInt(myData.items[i].quantity) +
            parseInt(data.items[0].quantity))
        : myData.items[i]
    );
    //Add new item to cart
  } else myData.items.push(newItem[0]);
  return myData;
};

module.exports.addItem = async (req, res) => {
  const { _id, size, quantity, sessionID } = req.body;
  const cookie = req.session.cookie;
  const sessionExpires = req.session.cookie._expires;
  //Create or Find Session
  const mySession = await findData(
    { cookie, expires: sessionExpires },
    sessionID,
    Session
  );
  //Create of Find Cart
  const myCart = await findData(
    { items: [{ _id, size, quantity }] },
    mySession.myCart,
    Cart
  );
  //Check if myCart exists on session; if not, add cart id
  mySession.myCart = mySession.myCart ?? myCart._id;
  //Add item data to most recent
  myCart.mostRecentItem = { _id, size, quantity };
  //Save data
  await mySession.save();
  await myCart.save();
  res.send({ sessionID: mySession._id });
};

module.exports.itemDetails = async (req, res) => {
  try {
    const { id, sessionID } = req.params;
    const mySession = await Session.findById(sessionID).populate(
      "myCart",
      "mostRecentItem"
    );
    const itemDetails = mySession.myCart.mostRecentItem;
    const items = await Item.find({});
    const item = await Item.findById(id);
    const itemsPreview = items.splice(1, 4);
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
    console.log(req.session);
    const { sessionID } = req.params;
    const mySession = await Session.findById(sessionID).populate({
      path: "myCart",
      populate: {
        path: "items",
        populate: {
          path: "_id",
        },
      },
    });
    res.send({ items: mySession.myCart.items });
  } catch (err) {
    console.error(err);
  }
};

module.exports.updateCart = async (req, res) => {
  try {
    const { sessionID } = req.params;
    const { updatedItems } = req.body;
    const mySession = await Session.findById(sessionID);
    const cartID = mySession.myCart;
    const resetItemIDs = updatedItems.map((item) => {
      item._id = item._id._id;
      return item;
    });
    const myCart = await Cart.findByIdAndUpdate(cartID, {
      items: resetItemIDs,
    });
    await myCart.save();
    await mySession.save();
    res.send({ success: "Cart successfully updated!" });
  } catch (err) {
    console.error(err);
  }
};

module.exports.deleteCartItem = async (req, res) => {
  try {
    const { id, sessionID } = req.params;
    const mySession = await Session.findById(sessionID).populate("myCart");
    const itemDeleted = mySession.myCart.items.filter(
      (item) => String(item._id) !== id
    );
    const myCart = await Cart.findByIdAndUpdate(mySession.myCart, {
      items: itemDeleted,
    });
    console.log(myCart);
    // myCart.save();
    // mySession.save();
    res.send({ deleted: "Item deleted." });
  } catch (err) {
    console.error(err);
  }
};
