const express = require("express");
const courseRouter = express.Router();
const authorizeRoles = require("../middleware/roleMiddleware");
const { addCourseController } = require("../controllers/courseController");

courseRouter.post('/add', authorizeRoles("admin"), addCourseController);

module.exports = courseRouter;