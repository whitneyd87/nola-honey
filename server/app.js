if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const passport = require("passport");
const mongoSanitize = require("express-mongo-sanitize");
const LocalStrategy = require("passport-local");
const helmet = require("helmet");
const User = require("./models/user");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const reviewRoutes = require("./routes/review");
const orderRoutes = require("./routes/order");

const clientPromise = mongoose
  .connect("mongodb://localhost:27017/nola-honey", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((m) => m.connection.getClient());
/*
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});
*/

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());

//Session
const sessionConfig = {
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise,
  }),
  cookie: {
    httpOnly: true,
    // secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(session(sessionConfig));
app.use(helmet());

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Flash Messages

//Routes
app.use("/", userRoutes);
app.use("/shop", shopRoutes);
// app.use("/order", orderRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode } = err;
  if (!err.message) err.message = "Error! Something went wrong.";
  res.status(statusCode).render("error", { err });
});

app.listen(3001, () => {
  console.log("Serving on port 3001!");
});
