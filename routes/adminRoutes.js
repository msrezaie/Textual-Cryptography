const express = require("express");
const router = express.Router();
const { multer, fileStorage } = require("../util/fileUpload");
const { authenticateAdmin } = require("../middleware/authHandler");

const {
  createCipher,
  removeCipher,
  updateCipher,
  getUsers,
} = require("../controllers/adminController");

router.route("/users").get(authenticateAdmin, getUsers);
router
  .route("/cipher/create")
  .post(
    authenticateAdmin,
    multer({ storage: fileStorage }).single("cipherFile"),
    createCipher
  );
router
  .route("/cipher/delete/:cipherName")
  .delete(authenticateAdmin, removeCipher);
router
  .route("/cipher/update/:cipherName")
  .patch(authenticateAdmin, updateCipher);

module.exports = router;
