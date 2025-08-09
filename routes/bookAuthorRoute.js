const express = require("express");
const bookAuthorRouter = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");
const createBookAuthorMappingController = require("../controllers/bookAuthorController");

bookAuthorRouter.post("/map", authorizeRoles("admin"), createBookAuthorMappingController);

module.exports = bookAuthorRouter;