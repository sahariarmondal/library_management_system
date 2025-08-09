const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
// const authenticate = require("../middleware/authMiddleware");
// const authorizeRoles = require("../middleware/roleMiddleware");

authRouter.post("/register/student", authController.registerStudent);
authRouter.post("/register/admin", authController.registerAdmin);
authRouter.post("/login", authController.login);

module.exports = authRouter;