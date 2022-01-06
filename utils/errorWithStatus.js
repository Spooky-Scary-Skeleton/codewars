module.exports = function errorWithStatus(req, message, status, originalError = null) {
  const error = new Error(message);
  error.status = status;

  if (req.app.get("env") === "development") {
    if (originalError) {
      return originalError;
    }
  }

  return error;
}
