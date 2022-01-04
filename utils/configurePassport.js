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
      async function (accessToken, refreshToken, profile, done) {
        console.log("1111this runs!", profile.id, profile.username);
        try {
          const currentUser = await User.findOne({ githubId: profile.id });
          console.log("cu", currentUser);
          if (currentUser) {
            done(null, currentUser);
          } else {
            const currentUser = await User.create({
              username: profile.username,
              githubId: profile.id,
            });

            done(null, currentUser);
          }
        } catch (error) {
          console.log("cametoerrorblock");
          done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    console.log("what is this???", user);
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    console.log("what is this222???", id);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(error) {
      done(error);
    }
  });
};
