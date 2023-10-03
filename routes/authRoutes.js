const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  login,
  signup,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/signup").post(signup);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

module.exports = router;
