const mongoose = require("mongoose");

const { PROBLEM } = require("../utils/constants").ERROR_MESSAGES.SCHEMA;

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: PROBLEM.TITLE,
  },
  completedUsers: {
    type: Number,
    required: PROBLEM.COMPLETED_USERS,
  },
  difficultyLevel: {
    type: Number,
    required: PROBLEM.DIFFICULTY_LEVEL,
  },
  description: {
    type: String,
    required: PROBLEM.DESCRIPTION,
  },
  tests: {
    type: Array,
    required: PROBLEM.TESTS,
  }
});

module.exports = mongoose.model("Problem", ProblemSchema);
