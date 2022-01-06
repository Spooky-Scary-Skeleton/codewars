const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");
const { ERROR_MESSAGES } = require("../utils/constants");
const errorWithStatus = require("../utils/errorWithStatus");

router.get("/", async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();

    res.render("base", { problems, url: req.originalUrl });
  } catch (error) {
    next(errorWithStatus(ERROR_MESSAGES.DB_ERROR, 500));
  }
});

module.exports = router;
