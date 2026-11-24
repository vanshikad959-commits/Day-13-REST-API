const Book = require("../models/bookModel");
const { sendSuccess, sendError } = require("../utils/apiResponse");

// Pick only the allowed fields from the request body
const pickBookFields = (body) => ({
  title: body.title,
  author: body.author,
  category: body.category,
  price: body.price,
  isbn: body.isbn,
  publishedYear: body.publishedYear,
  stock: body.stock,
});

// GET /api/books
const getAllBooks = (req, res, next) => {
  try {
    const books = Book.getAll();
    return sendSuccess(res, 200, "Books retrieved successfully", {
      count: books.length,
      books,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/books/:id
const getBookById = (req, res, next) => {
  try {
    const book = Book.getById(Number(req.params.id));
    if (!book) return sendError(res, 404, `Book with ID ${req.params.id} not found`);
    return sendSuccess(res, 200, "Book retrieved successfully", book);
  } catch (err) {
    next(err);
  }
};

// POST /api/books
const createBook = (req, res, next) => {
  try {
    if (Book.getByIsbn(req.body.isbn)) {
      return sendError(res, 400, "A book with this ISBN already exists");
    }
    const book = Book.create(pickBookFields(req.body));
    return sendSuccess(res, 201, "Book added successfully", book);
  } catch (err) {
    next(err);
  }
};

// PUT /api/books/:id
const updateBook = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Book.getById(id)) return sendError(res, 404, `Book with ID ${id} not found`);

    const duplicate = Book.getByIsbn(req.body.isbn);
    if (duplicate && duplicate.id !== id) {
      return sendError(res, 400, "Another book already uses this ISBN");
    }
    const book = Book.update(id, pickBookFields(req.body));
    return sendSuccess(res, 200, "Book updated successfully", book);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/books/:id
const deleteBook = (req, res, next) => {
  try {
    const deleted = Book.remove(Number(req.params.id));
    if (!deleted) return sendError(res, 404, `Book with ID ${req.params.id} not found`);
    return sendSuccess(res, 200, "Book deleted successfully", deleted);
  } catch (err) {
    next(err);
  }
};

// GET /api/books/search?title=
const searchBooks = (req, res, next) => {
  try {
    const books = Book.searchByTitle(req.query.title);
    return sendSuccess(
      res,
      200,
      books.length ? "Search completed successfully" : "No books matched your search",
      { count: books.length, books }
    );
  } catch (err) {
    next(err);
  }
};

// GET /api/books/category/:name
const getBooksByCategory = (req, res, next) => {
  try {
    const books = Book.getByCategory(req.params.name);
    return sendSuccess(
      res,
      200,
      books.length ? "Books retrieved successfully" : "No books found in this category",
      { count: books.length, books }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getBooksByCategory,
};
