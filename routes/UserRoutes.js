const { Router } = require("express");
const {
  login,
  register,
  getCurrentUser,
} = require("../controllers/UsersControllers");
const { authenticateUser } = require("../controllers/authMiddleware");

const router = Router();

// Endpoints
router.post("/register", register);
router.post("/login", login);
router.get("/current-user", getCurrentUser);

module.exports = router;
