const express = require("express");
const { createBookRequestController, testController } = require("../controllers/bookRequestController");
const bookRequestRouter = express.Router();

bookRequestRouter.post("/post", createBookRequestController);

module.exports = bookRequestRouter;