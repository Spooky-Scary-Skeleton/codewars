const express = require("express");
const router = express.Router();

router.get("/callback", (req, res, next) => {
  res.render("index", { title: "바닐라코딩" });
});

module.exports = router;
