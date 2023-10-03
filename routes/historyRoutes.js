const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  getAllHistory,
  saveHistory,
  deleteHistory,
} = require("../controllers/historyController");

router.get("/history", authenticateUser, getAllHistory);
router.post("/history/save", authenticateUser, saveHistory);
router.delete("/history/delete/:id", authenticateUser, deleteHistory);

module.exports = router;
