const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  login,
  register,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/register").post(register);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

module.exports = router;
