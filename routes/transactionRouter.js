const express = require("express");
const transactionRouter = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");
const {issueBookController} = require("../controllers/transactionController");

transactionRouter.post("/issue", authorizeRoles("admin"), issueBookController );

module.exports = transactionRouter;