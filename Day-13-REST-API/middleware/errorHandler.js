const { sendError } = require("../utils/apiResponse");
const { env } = require("../config/config");

// 404 handler – runs when no route matched
const notFound = (req, res, next) => {
  sendError(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
};

// Global error handler – must have 4 arguments
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Malformed JSON body
  if (err.type === "entity.parse.failed") {
    return sendError(res, 400, "Invalid JSON in request body");
  }

  const status = err.status || err.statusCode || 500;
  console.error("❌ Error:", err.message);

  const response = {
    success: false,
    message: status === 500 ? "Internal Server Error" : err.message,
    data: {},
  };
  if (env === "development") response.stack = err.stack;

  return res.status(status).json(response);
};

module.exports = { notFound, errorHandler };
