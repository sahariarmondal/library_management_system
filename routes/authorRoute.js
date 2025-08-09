// 

const express = require("express");
const authorRouter = express.Router();
const { addAuthorsController, getBooksByAuthorIdController } = require('../controllers/authorController');
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

authorRouter.post('/add', authenticate, authorizeRoles("admin"), addAuthorsController);
authorRouter.get('/get/:id', authenticate, getBooksByAuthorIdController );

module.exports = authorRouter;
