const jwt = require("jsonwebtoken");

/**
 * Generates a JWT token for a user.
 * @param {*} user - The user object.
 * @returns {*} - The generated JWT token.
 */
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

/**
 * Verifies a JWT token.
 *
 * @param {*} token - The JWT token to verify.
 * @returns {*} - The decoded token payload if valid, null otherwise.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
