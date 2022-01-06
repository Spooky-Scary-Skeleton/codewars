const passport = require("passport");

const User = require("../models/User");
const GitHubStrategy = require("passport-github").Strategy;
const { ERROR_MESSAGE } = require("../utils/constants");
const errorWithStatus = require("../utils/errorWithStatus");

module.exports = function configurePassport() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:8000/login/auth/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const currentUser = await User.findOne({ githubId: profile.id });

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
          done(errorWithStatus(ERROR_MESSAGE.DB_ERROR, 500));
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(errorWithStatus(ERROR_MESSAGE.DB_ERROR, 500));
    }
  });
};
