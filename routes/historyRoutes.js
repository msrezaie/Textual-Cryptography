const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  getAllHistory,
  saveHistory,
  deleteHistory,
  deleteAllHistory,
} = require("../controllers/historyController");

// @route   GET /api/v1/history
router.get("/", authenticateUser, getAllHistory);

// @route   POST /api/v1/history/save
router.post("/save", authenticateUser, saveHistory);

// @route   DELETE /api/v1/history/delete/:id
router.delete("/delete/:id", authenticateUser, deleteHistory);

// @route   DELETE /api/v1/history/deleteAll/:userId
router.delete("/deleteAll/:userId", authenticateUser, deleteAllHistory);

module.exports = router;
