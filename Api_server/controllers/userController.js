const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Handles registration for both clients and owners
const registerUser = async (req, res) => {
  const { username, email, password, role, dbKey } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  // Secret key check for owner registration
  if (role === "owner" && dbKey !== "RadaOwnerKey2025") {
    return res
      .status(401)
      .json({ message: "Invalid key for owner registration" });
  }

  const user = await User.create({
    username,
    email,
    password,
    role: role || "client",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Handles login for both clients and owners
// --- LOGIN AN EXISTING USER (NEW SECURE VERSION) ---
const loginUser = async (req, res) => {
  // We now expect the frontend to tell us if it's an owner or client login
  const { username, password, ownerId, ownerPassword, loginType } = req.body;

  try {
    if (loginType === "owner") {
      // --- OWNER LOGIN LOGIC ---
      const user = await User.findOne({ username: ownerId });

      // Security check: Make sure the user found is actually an owner
      if (user && user.role !== "owner") {
        return res
          .status(403)
          .json({ message: "Access denied. This user is not an owner." });
      }

      if (user && (await user.matchPassword(ownerPassword))) {
        res.json({
          _id: user._id,
          username: user.username,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid Owner ID or password" });
      }
    } else {
      // --- CLIENT LOGIN LOGIC ---
      const user = await User.findOne({ username });

      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          username: user.username,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
