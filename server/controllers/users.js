const User = require("../models/user");
const Order = require("../models/order");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      // req.flash("success", "Success! Welcome to Nola Honey!");
    });
    return res.send({ redirect: true });
  } catch (err) {
    // req.flash("error", err.message);
    console.error(err);
  }
};

module.exports.signin = (req, res) => {
  try {
    // req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/shop";
    res.send({ signedIn: true, redirect: redirectUrl });
  } catch (err) {
    console.error(err);
  }
};

module.exports.accountInfo = async (req, res) => {
  try {
    const username = req.session.passport.user;
    const user = await User.findOne({ username });
    res.send({
      addresses: user.addresses,
      orders: user.orders,
      reviews: user.reviews,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports.signout = (req, res) => {
  req.logout();
  // req.flash("success", "You logged out!");
  res.send({ redirect: true });
};
