const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  }
});

module.exports = mongoose.model("User", userSchema);
