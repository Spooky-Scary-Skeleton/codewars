const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const configResult = require('dotenv').config();

if (configResult.error) {
  throw configResult.error;
}

const index = require("./routes/index");
const login = require("./routes/login");
const problems = require("./routes/problems");

const app = express();

require("./utils/setAuthStratage")();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", index);
app.use("/login", login);
app.use("/", problems);


app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
