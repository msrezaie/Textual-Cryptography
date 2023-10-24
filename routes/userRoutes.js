const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  getCurrentUser,
  updateUser,
  deleteAccount,
} = require("../controllers/userController");

router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/update/:email").patch(authenticateUser, updateUser);
router.route("/delete/:email").delete(authenticateUser, deleteAccount);

module.exports = router;
