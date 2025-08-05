// 

const express = require("express");
const authorRouter = express.Router();
const { addAuthorsController, getBooksByAuthorIdController } = require('../controllers/authorController');

authorRouter.post('/add', addAuthorsController);
authorRouter.get('/get/:id', getBooksByAuthorIdController );

module.exports = authorRouter;
