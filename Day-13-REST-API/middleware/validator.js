const { body, param, query, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

const currentYear = new Date().getFullYear();

// Rules shared by POST (create) and PUT (full update)
const bookRules = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 2, max: 150 }).withMessage("Title must be 2-150 characters"),

  body("author")
    .trim()
    .notEmpty().withMessage("Author is required")
    .isLength({ min: 2, max: 100 }).withMessage("Author must be 2-100 characters"),

  body("category")
    .trim()
    .notEmpty().withMessage("Category is required")
    .isLength({ min: 2, max: 50 }).withMessage("Category must be 2-50 characters"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be a number greater than 0")
    .toFloat(),

  body("isbn")
    .trim()
    .notEmpty().withMessage("ISBN is required")
    .isISBN().withMessage("ISBN must be a valid ISBN-10 or ISBN-13"),

  body("publishedYear")
    .notEmpty().withMessage("Published year is required")
    .isInt({ min: 1000, max: currentYear })
    .withMessage(`Published year must be between 1000 and ${currentYear}`)
    .toInt(),

  body("stock")
    .notEmpty().withMessage("Stock quantity is required")
    .isInt({ min: 0 }).withMessage("Stock must be a whole number (0 or more)")
    .toInt(),
];

const idRule = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
];

const searchRule = [
  query("title").trim().notEmpty().withMessage("Query parameter 'title' is required"),
];

// Collects validation errors and returns 400 in the standard format
const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((e) => ({ field: e.path, message: e.msg }));
  return sendError(res, 400, "Validation failed", errors);
};

module.exports = {
  validateCreateBook: [...bookRules, handleValidation],
  validateUpdateBook: [...idRule, ...bookRules, handleValidation],
  validateId: [...idRule, handleValidation],
  validateSearch: [...searchRule, handleValidation],
};
