const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

// @route   GET /api/v1/auth/getCurrentUser
router.route("/getCurrentUser").get(getCurrentUser);

// @route   POST /api/v1/auth/signup
router.route("/signup").post(signup);

// @route   POST /api/v1/auth/login
router.route("/login").post(login);

// @route   POST /api/v1/auth/logout
router.route("/logout").post(logout);

module.exports = router;
