const express = require("express");
const router = express.Router();

const {
  getAllCiphers,
  transformText,
} = require("../controllers/cipherController");

// @route   GET /api/v1/cryptography/ciphers
router.get("/ciphers", getAllCiphers);

// @route   POST /api/v1/cryptography
router.post("/", transformText);

module.exports = router;
