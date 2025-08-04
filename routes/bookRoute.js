const express = require("express");
const bookRouter = express.Router();
const { addBook, getBookByTitle, getAllBooksWithAuthorAndCopies } = require("../controllers/bookController");

bookRouter.get("/get", getBookByTitle);
bookRouter.get("/getall", getAllBooksWithAuthorAndCopies);
bookRouter.post("/add", addBook);

module.exports = bookRouter;
