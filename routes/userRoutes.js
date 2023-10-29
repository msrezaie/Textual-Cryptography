const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  updateUser,
  deleteAccount,
  sendOTP,
  validateOTP,
  resetPassword,
} = require("../controllers/userController");

// @route   POST /api/v1/user/sendOTP
router.route("/sendOTP").post(sendOTP);

// @route   POST /api/v1/user/validateOTP
router.route("/validateOTP").post(validateOTP);

// @route   PATCH /api/v1/user/resetPassword/:email
router.route("/resetPassword/:email").patch(resetPassword);

// @route   PATCH /api/v1/user/update/:email
router.route("/update/:email").patch(authenticateUser, updateUser);

// @route   DELETE /api/v1/user/delete/:email
router.route("/delete/:email").delete(authenticateUser, deleteAccount);

module.exports = router;
