const User = require("../models/user");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Success! Welcome to Nola Honey!");
      res.redirect("/shop");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || "/myaccount";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "You logged out!");
  res.redirect("/");
};
