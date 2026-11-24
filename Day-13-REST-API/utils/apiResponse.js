// Standard response shape: { success, message, data }
const sendSuccess = (res, statusCode, message, data = {}) =>
  res.status(statusCode).json({ success: true, message, data });

const sendError = (res, statusCode, message, errors) => {
  const body = { success: false, message, data: {} };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
};

module.exports = { sendSuccess, sendError };
