const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/auth",   (req, res, next) => {
  console.log("/auth router!!!", req.user);
  next();
},passport.authenticate("github")
);

router.get(
  "/auth/callback",
  (req, res, next) => {
    console.log("/auth/callback router!!!", "req.user");
    next();
  },
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("authed", req.user);
    console.log("authed2", req.session);
    res.redirect("/");
  }
);

module.exports = router;
