const express = require("express");
const router = express.Router();

const controller = require("../controllers/bookController");
const {
  validateCreateBook,
  validateUpdateBook,
  validateId,
  validateSearch,
} = require("../middleware/validator");

// NOTE: /search and /category/:name must be declared BEFORE /:id,
// otherwise Express would treat "search" as an id.
router.get("/search", validateSearch, controller.searchBooks);
router.get("/category/:name", controller.getBooksByCategory);

router.get("/", controller.getAllBooks);
router.get("/:id", validateId, controller.getBookById);
router.post("/", validateCreateBook, controller.createBook);
router.put("/:id", validateUpdateBook, controller.updateBook);
router.delete("/:id", validateId, controller.deleteBook);

module.exports = router;
