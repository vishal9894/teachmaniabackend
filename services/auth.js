const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate JWT token for a user
const GenerateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "7h" },
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GenerateToken, verifyToken };
