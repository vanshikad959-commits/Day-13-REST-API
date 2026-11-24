const fs = require("fs");
const { dataFile } = require("../config/config");

// ---- helpers: persist books in data/books.json ----
const readBooks = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
};

const writeBooks = (books) =>
  fs.writeFileSync(dataFile, JSON.stringify(books, null, 2));

// ---- model API ----
const getAll = () => readBooks();

const getById = (id) => readBooks().find((b) => b.id === id);

const getByIsbn = (isbn) =>
  readBooks().find((b) => b.isbn.replace(/-/g, "") === isbn.replace(/-/g, ""));

const searchByTitle = (title) =>
  readBooks().filter((b) => b.title.toLowerCase().includes(title.toLowerCase()));

const getByCategory = (name) =>
  readBooks().filter((b) => b.category.toLowerCase() === name.toLowerCase());

const create = (data) => {
  const books = readBooks();
  const id = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
  const book = { id, ...data };
  books.push(book);
  writeBooks(books);
  return book;
};

const update = (id, data) => {
  const books = readBooks();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;
  books[index] = { id, ...data };
  writeBooks(books);
  return books[index];
};

const remove = (id) => {
  const books = readBooks();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return null;
  const [deleted] = books.splice(index, 1);
  writeBooks(books);
  return deleted;
};

module.exports = {
  getAll,
  getById,
  getByIsbn,
  searchByTitle,
  getByCategory,
  create,
  update,
  remove,
};
