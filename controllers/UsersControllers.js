const UserModel = require("../models/UsersModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.authenticateRole = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ error: "Authentication token not found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, "secret-key");
    if (decoded.role !== requiredRole) {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate user" });
  }
};

//Ueser Registration
module.exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

// User Login
module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate user" });
  }
};

// Get Current User
module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get current user" });
  }
};
