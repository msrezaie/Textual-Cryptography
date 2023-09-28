const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  getAllHistory,
  saveHistory,
} = require("../controllers/historyController");

router.get("/history", authenticateUser, getAllHistory);
router.post("/history", authenticateUser, saveHistory);

module.exports = router;
