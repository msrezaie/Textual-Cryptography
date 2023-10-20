const express = require("express");
const router = express.Router();
const { login, signup, logout } = require("../controllers/authController");

router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/signup").post(signup);

module.exports = router;
