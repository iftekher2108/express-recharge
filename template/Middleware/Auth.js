const jwt = require("jsonwebtoken");
const User = require("../Users/model/User");
const { verifyToken } = require("../utils/jwt");

const Auth = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from the header (Authorization: Bearer <token>)

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user; // Attach user data to the request object
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = Auth;
