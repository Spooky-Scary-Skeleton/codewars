const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");

router.get("/:problem_id", async (req, res, next) => {
  const problemId = req.params.problem_id;
  const problem = await Problem.findById(problemId).lean();

  res.render("base", { problem, url: req.originalUrl });
});

router.post("/:problem_id", (req, res, next) => {
  res.send("hey!");
});

module.exports = router;
