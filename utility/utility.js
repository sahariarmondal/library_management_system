const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      user_id: user.user_id,
      role: user.role,
    },
    process.env.JWT_SECRET || "your_secret_key", // store secret in env
    {
      expiresIn: "2d",
    }
  );
};

module.exports = generateToken;
