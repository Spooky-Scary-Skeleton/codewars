const errorWithStatus = require("../utils/errorWithStatus");
const { TEMPLATE_ERROR } = require("../utils/constants").ERROR_MESSAGES;

module.exports = function renderErrorCallback(req, res, next) {
  return function(error, html) {
    if (error) {
      next(errorWithStatus(req, TEMPLATE_ERROR, 500, error));
      return;
    }
    res.send(html);
  }
}
