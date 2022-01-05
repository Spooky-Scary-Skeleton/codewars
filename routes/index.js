const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");

router.get("/", async (req, res, next) => {
  const problems = await Problem.find().lean();
  console.dir(problems[0].completed_users);

  res.render("index", { problems, title: "바닐라코딩" });
});

module.exports = router;
