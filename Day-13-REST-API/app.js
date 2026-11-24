const express = require("express");
const cors = require("cors");

const { port, env } = require("./config/config");
const { morganLogger, requestTimer } = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// ---- Global middleware ----
app.use(cors());
app.use(express.json());
app.use(morganLogger);
app.use(requestTimer);

// ---- Routes ----
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bookstore REST API is running",
    data: { version: "1.0.0", endpoints: "/api/books" },
  });
});

app.use("/api/books", bookRoutes);

// ---- Error handling (must be last) ----
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server running in ${env} mode on http://localhost:${port}`);
});

module.exports = app;
