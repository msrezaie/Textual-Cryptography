const express = require("express");
const router = express.Router();
const { multer, fileStorage } = require("../util/fileUpload");

const {
  createMethod,
  removeMethod,
  createCipher,
  removeCipher,
} = require("../controllers/adminController");

router.route("/method/create").post(createMethod);
router.route("/method/delete/:name").delete(removeMethod);
router
  .route("/cipher/create")
  .put(multer({ storage: fileStorage }).single("cipherFile"), createCipher);
router.route("/cipher/delete/:methodName&:cipherName").delete(removeCipher);

module.exports = router;
