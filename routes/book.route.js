const route = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const bookService = require("../services/book.service");

// create book
route.post("/", isAuthenticated, bookService.createBook);

// get all books
route.get("/", isAuthenticated, bookService.readAllBooks);

// get a particular book
route.get("/:bookId", isAuthenticated, bookService.readBook);

// update book
route.put("/:bookId", isAuthenticated, bookService.updateBook);

// delete book
route.delete("/:bookId", isAuthenticated, bookService.deleteBook);

module.exports = route;
