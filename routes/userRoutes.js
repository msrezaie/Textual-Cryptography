const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const { getCurrentUser, updateUser } = require("../controllers/userController");

router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/update/:email").patch(authenticateUser, updateUser);

module.exports = router;
