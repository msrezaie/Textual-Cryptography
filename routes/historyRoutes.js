const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authHandler");
const {
  getAllHistory,
  saveHistory,
  deleteHistory,
  deleteAllHistory,
} = require("../controllers/historyController");

router.get("/", authenticateUser, getAllHistory);
router.post("/save", authenticateUser, saveHistory);
router.delete("/delete/:id", authenticateUser, deleteHistory);
router.delete("/deleteAll/:userId", authenticateUser, deleteAllHistory);

module.exports = router;
