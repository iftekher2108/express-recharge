const bcrypt = require("bcryptjs");
const { generateToken } = require("@utils/jwt");
const User = require("@module/Users/Models/User");


// login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user); // Create JWT token
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    }); // Send token back to the client
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};



// register function
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the user
    const token = generateToken(user);

    // Respond with the token and user data (you can choose what to send back)
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
};



// logout function
exports.logout = (req, res) => {
  // On client: just delete token.
  res.json({
    message: "Logged out successfully. (Client should delete token)",
  });
};
