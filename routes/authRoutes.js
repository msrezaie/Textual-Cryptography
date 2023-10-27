const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  logout,
  getCurrentUser,
} = require("../controllers/authController");

router.route("/getCurrentUser").get(getCurrentUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/signup").post(signup);

module.exports = router;
