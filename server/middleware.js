module.exports.isSignedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    // req.flash("error", "You must be logged in!");
    return res.send({ redirect: true });
  }
  next();
};
