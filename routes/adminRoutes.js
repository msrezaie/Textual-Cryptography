const express = require("express");
const router = express.Router();
const { multer, fileStorage } = require("../util/fileUpload");
const {
  authenticateReadAdmin,
  authenticateRootAdmin,
} = require("../middleware/authHandler");

const {
  createCipher,
  removeCipher,
  updateCipher,
  getUsers,
  addUser,
  removeUser,
  updateUser,
  getCipherFile,
} = require("../controllers/adminController");

// @route   GET /api/v1/admin/users
router.route("/users").get(authenticateReadAdmin, getUsers);

// @route   POST /api/v1/admin/user/create
router.route("/user/create").post(authenticateRootAdmin, addUser);

// @route   DELETE /api/v1/admin/user/delete/:email
router.route("/user/delete/:email").delete(authenticateRootAdmin, removeUser);

// @route   PATCH /api/v1/admin/user/update/:userEmail
router
  .route("/user/update/:userEmail")
  .patch(authenticateRootAdmin, updateUser);

// @route   GET /api/v1/admin/cipher/file/:cipherName
router
  .route("/cipher/file/:cipherName")
  .get(authenticateReadAdmin, getCipherFile);

// @route   POST /api/v1/admin/cipher/create
router
  .route("/cipher/create")
  .post(
    authenticateRootAdmin,
    multer({ storage: fileStorage }).single("cipherFile"),
    createCipher
  );

// @route   DELETE /api/v1/admin/cipher/delete/:cipherName
router
  .route("/cipher/delete/:cipherName")
  .delete(authenticateRootAdmin, removeCipher);

// @route   PATCH /api/v1/admin/cipher/update/:cipher
router
  .route("/cipher/update/:cipher")
  .patch(
    authenticateRootAdmin,
    multer({ storage: fileStorage }).single("cipherFile"),
    updateCipher
  );

module.exports = router;
