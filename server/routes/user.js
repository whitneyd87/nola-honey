const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");

router.route("/createaccount").post(catchAsync(users.registerUser));

router.route("/signin").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/signin",
  }),
  users.login
);

router.get("/logout", users.logout);

module.exports = router;
