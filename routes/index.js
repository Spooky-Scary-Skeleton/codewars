const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");
const { ERROR_MESSAGES } = require("../utils/constants");
const errorWithStatus = require("../utils/errorWithStatus");
const renderErrorCallback = require("../utils/renderErrorCallback");

router.get("/", async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();

    res.render("base", { problems, url: req.originalUrl }, renderErrorCallback(req, res, next));
  } catch (error) {
    next(errorWithStatus(req, ERROR_MESSAGES.DB_ERROR, 500, error));
  }
});

module.exports = router;
