const morgan = require("morgan");

// 1. Morgan HTTP request logger
const morganLogger = morgan("dev");

// 2. Request timing middleware – adds X-Response-Time header and logs duration
const requestTimer = (req, res, next) => {
  const start = process.hrtime.bigint();

  // Header must be set before the response headers are flushed
  const originalWriteHead = res.writeHead;
  res.writeHead = function (...args) {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    res.setHeader("X-Response-Time", `${ms.toFixed(2)}ms`);
    return originalWriteHead.apply(this, args);
  };

  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(`⏱  ${req.method} ${req.originalUrl} took ${ms.toFixed(2)}ms`);
  });

  next();
};

module.exports = { morganLogger, requestTimer };
