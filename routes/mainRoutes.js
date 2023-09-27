const express = require("express");
const router = express.Router();

const {
  getAllCiphers,
  transformText,
} = require("../controllers/cipherController");

router.get("/ciphers", getAllCiphers);
router.post("/", transformText);

module.exports = router;
