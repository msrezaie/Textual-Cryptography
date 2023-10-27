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

router.route("/sendOTP").post(sendOTP);
router.route("/validateOTP").post(validateOTP);
router.route("/resetPassword/:email").patch(resetPassword);
router.route("/update/:email").patch(authenticateUser, updateUser);
router.route("/delete/:email").delete(authenticateUser, deleteAccount);

module.exports = router;
