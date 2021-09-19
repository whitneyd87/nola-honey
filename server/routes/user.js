const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const users = require("../controllers/users");
const passport = require("passport");

router.route("/register").post(catchAsync(users.registerUser));

router.route("login").post(
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.get("/logout", users.logout);

module.exports = router;
