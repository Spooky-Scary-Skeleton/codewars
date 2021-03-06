const passport = require("passport");
const express = require("express");
const router = express.Router();

const renderErrorCallback = require("../utils/renderErrorCallback");

router.get("/", (req, res, next) => {
  res.render(
    "base",
    { url: req.originalUrl },
    renderErrorCallback(req, res, next)
  );
});

router.get("/auth", passport.authenticate("github"));

router.get(
  "/auth/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
