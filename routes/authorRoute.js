// 

const express = require("express");
const authorRouter = express.Router();
const { addAuthorsController } = require('../controllers/authorController');

authorRouter.post('/add', addAuthorsController);

module.exports = authorRouter;
