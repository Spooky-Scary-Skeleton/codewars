const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const configResult = require("dotenv").config();

if (configResult.error) {
  throw new Error( "Failed to set environment variable. Check dotenv settings.");
}

const index = require("./routes/index");
const login = require("./routes/login");
const problems = require("./routes/problems");
const checkLogin = require("./middlewares/checkLoginHandler");
const logoutHandler = require("./middlewares/logoutHandler");

const configurePassport = require("./utils/configurePassport");
const { ERROR_MESSAGES } = require("./utils/constants");
const errorWithStatus = require("./utils/errorWithStatus");

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.use("/lib", express.static(__dirname + "/node_modules/codemirror/lib"));
app.use("/mode", express.static(__dirname + "/node_modules/codemirror/mode"));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

configurePassport();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE),
    },
    store: mongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", login);
app.use("/", checkLogin, index);
app.use("/logout", logoutHandler);
app.use("/problems", problems);
app.use("*", function (req, res, next) {
  next(errorWithStatus(req, ERROR_MESSAGES.PAGE_NOT_FOUND, 404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
