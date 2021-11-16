const User = require("../models/user");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      // req.flash("success", "Success! Welcome to Nola Honey!");
      // res.redirect("/shop");
    });
  } catch (err) {
    // req.flash("error", err.message);
    console.error(err);
  }
};

module.exports.signin = (req, res) => {
  try {
    // req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/myaccount";
    res.send({ redirect: redirectUrl, signedIn: true });
  } catch (err) {
    console.error(err);
  }
};

module.exports.signout = (req, res) => {
  req.logout();
  // req.flash("success", "You logged out!");
  res.send({ redirect: true });
};
