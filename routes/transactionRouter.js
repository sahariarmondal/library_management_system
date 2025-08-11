const express = require("express");
const transactionRouter = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");
const {issueBookController, returnBookController} = require("../controllers/transactionController");

transactionRouter.post("/issue", authorizeRoles("admin"), issueBookController );
transactionRouter.post("/return", authorizeRoles("admin"), returnBookController );
module.exports = transactionRouter;