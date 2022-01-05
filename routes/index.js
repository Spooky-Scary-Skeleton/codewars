const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");

router.get("/", async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();
    console.dir(problems[0].completed_users);

    res.render("base", { problems, url: req.originalUrl });
  } catch(error) {
    next(error);
  }
});

module.exports = router;
