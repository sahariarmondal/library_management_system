const bcrypt = require("bcrypt");
const { User, Student, Admin } = require("../models");
const generateToken = require("../utils/generateToken");

// Register
const register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!["student", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword, role });

  if (role === "student") {
    await Student.create({ user_id: newUser.user_id });
  } else {
    await Admin.create({ user_id: newUser.user_id });
  }

  const token = generateToken(newUser);
  res.status(201).json({ token, message: "Registered successfully" });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.status(200).json({ token, message: "Login successful" });
};

module.exports = {login, register};