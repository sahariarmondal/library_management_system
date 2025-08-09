// const bcrypt = require("bcryptjs");
// const User = require("../models/user");
// const Student = require("../models/student");
// const Admin = require("../models/admin");
// const generateToken = require("../utils/generateToken");

// // Register
// const register = async (req, res) => {
//   const { email, password, role } = req.body;

//   if (!["student", "admin"].includes(role)) {
//     return res.status(400).json({ error: "Invalid role" });
//   }

//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     return res.status(400).json({ error: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await User.create({ email, password: hashedPassword, role });

//   if (role === "student") {
//     await Student.create({ user_id: newUser.user_id });
//   } else {
//     await Admin.create({ user_id: newUser.user_id });
//   }

//   const token = generateToken(newUser);
//   res.status(201).json({ token, message: "Registered successfully" });
// };

// // Login
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ where: { email } });
//   if (!user) return res.status(400).json({ error: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//   const token = generateToken(user);
//   res.status(200).json({ token, message: "Login successful" });
// };

// module.exports = {login, register};

const jwt = require("jsonwebtoken");

const authenticate =  (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.user = decoded; // contains user_id and role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token from here" });
  }
};

module.exports = authenticate;
