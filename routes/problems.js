const express = require("express");
const router = express.Router();

router.get("/:problem_id", (req, res, next) => {
  res.send("hey!");
});

router.post("/:problem_id", (req, res, next) => {
  res.send("hey!");
});

module.exports = router;
