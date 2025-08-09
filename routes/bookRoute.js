const express = require("express");
const bookRouter = express.Router();
const { addBookController, getBookByTitleController, deleteBookByIdController, updateBookController, addBookWithAuthorsController, getBookByFullTitleWithAuthorsController } = require("../controllers/bookController");
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

bookRouter.get("/get",  getBookByTitleController);
bookRouter.post("/add", authorizeRoles("admin"), addBookController);
bookRouter.delete("/:id", authorizeRoles("admin"), deleteBookByIdController);
bookRouter.put("/:id", authorizeRoles("admin"), updateBookController);
bookRouter.post("/addbook", authorizeRoles("admin"), addBookWithAuthorsController);
bookRouter.get("/get-by-title-autors", getBookByFullTitleWithAuthorsController);

module.exports = bookRouter;

