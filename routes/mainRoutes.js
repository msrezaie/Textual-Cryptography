const express = require("express");
const router = express.Router();

const {
  getAllMethods,
  transformText,
} = require("../controllers/methodController");

router.get("/", getAllMethods);
router.post("/", transformText);

module.exports = router;
