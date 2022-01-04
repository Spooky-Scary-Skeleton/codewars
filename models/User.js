const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: String,
  githubId: {
    type: String,
    required: true,
    unique: true,
  }
});

module.exports = mongoose.model("User", userSchema);
