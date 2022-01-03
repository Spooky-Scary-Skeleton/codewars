const passport = require("passport");
const User = require("../models/User");
const GitHubStrategy = require("passport-github").Strategy;

module.exports = function () {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:8000/login/auth/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("1111this runs!", accessToken)
        done(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    console.log("what is this???", user);
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    console.log("what is this222???", obj);
    cb(null, obj);
  });
};
