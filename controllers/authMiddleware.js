const UserModel = require("../models/UsersModels");

const authenticateUser = async (req, res, next) => {
  const userId = req.headers.userid;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate user" });
  }
};

module.exports = {
  authenticateUser,
};
