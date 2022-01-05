const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completedUsers: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: {
    type: Array,
    required: true,
  }
});

module.exports = mongoose.model("Problem", ProblemSchema);
