const express = require("express");
const bookRouter = express.Router();
const { addBookController, getBookByTitleController, getAllBooksWithAuthorAndCopies, deleteBookByIdController } = require("../controllers/bookController");

bookRouter.get("/get", getBookByTitleController);
bookRouter.get("/getall", getAllBooksWithAuthorAndCopies);
bookRouter.post("/add", addBookController);
bookRouter.delete("/:id",deleteBookByIdController);

module.exports = bookRouter;
