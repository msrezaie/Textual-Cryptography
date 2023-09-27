const express = require("express");
const router = express.Router();
const { multer, fileStorage } = require("../util/fileUpload");

const {
  createCipher,
  removeCipher,
} = require("../controllers/adminController");

router
  .route("/cipher/create")
  .post(multer({ storage: fileStorage }).single("cipherFile"), createCipher);
router.route("/cipher/delete/:cipherName").delete(removeCipher);

module.exports = router;
