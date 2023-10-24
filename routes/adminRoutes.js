const express = require("express");
const router = express.Router();
const { multer, fileStorage } = require("../util/fileUpload");
const { authenticateAdmin } = require("../middleware/authHandler");

const {
  createCipher,
  removeCipher,
  updateCipher,
  getUsers,
  addUser,
  removeUser,
  modifyUser,
  getCipherFile,
} = require("../controllers/adminController");

router.route("/users").get(authenticateAdmin, getUsers);
router.route("/user/create").post(authenticateAdmin, addUser);
router.route("/user/delete/:email").delete(authenticateAdmin, removeUser);
router.route("/user/modify/:id").patch(authenticateAdmin, modifyUser);

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
  .route("/cipher/update/:id")
  .patch(
    authenticateAdmin,
    multer({ storage: fileStorage }).single("cipherFile"),
    updateCipher
  );
router.route("/cipher/file/:cipherName").get(authenticateAdmin, getCipherFile);

module.exports = router;
