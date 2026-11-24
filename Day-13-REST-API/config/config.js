const path = require("path");
require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || "development",
  dataFile: path.join(__dirname, "..", "data", "books.json"),
};
