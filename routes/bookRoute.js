const express = require("express");
const bookRouter = express.Router();
const { addBookController, getBookByTitleController, deleteBookByIdController, updateBookController, addBookWithAuthorsController, getBookByFullTitleWithAuthorsController } = require("../controllers/bookController");

bookRouter.get("/get", getBookByTitleController);
bookRouter.post("/add", addBookController);
bookRouter.delete("/:id",deleteBookByIdController);
bookRouter.put("/:id",updateBookController);
bookRouter.post("/addbook", addBookWithAuthorsController);
bookRouter.get("/get-by-title-autors", getBookByFullTitleWithAuthorsController);

module.exports = bookRouter;

