const express = require("express");
const bookRouter = express.Router();
const { addBook } = require("../controllers/bookController");

bookRouter.post("/add", addBook);

module.exports = bookRouter;
