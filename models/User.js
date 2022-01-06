const mongoose = require("mongoose");

const { USER } = require("../utils/constants").ERROR_MESSAGES.SCHEMA;

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: String,
  githubId: {
    type: String,
    required: USER.GITHUB_ID,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
