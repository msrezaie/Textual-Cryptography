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
  modifyUser,
  getCipherFile,
} = require("../controllers/adminController");

router.route("/users").get(authenticateReadAdmin, getUsers);
router.route("/user/create").post(authenticateRootAdmin, addUser);
router.route("/user/delete/:email").delete(authenticateRootAdmin, removeUser);
router.route("/user/modify/:id").patch(authenticateRootAdmin, modifyUser);

router
  .route("/cipher/create")
  .post(
    authenticateRootAdmin,
    multer({ storage: fileStorage }).single("cipherFile"),
    createCipher
  );
router
  .route("/cipher/delete/:cipherName")
  .delete(authenticateRootAdmin, removeCipher);
router
  .route("/cipher/update/:id")
  .patch(
    authenticateRootAdmin,
    multer({ storage: fileStorage }).single("cipherFile"),
    updateCipher
  );
router
  .route("/cipher/file/:cipherName")
  .get(authenticateReadAdmin, getCipherFile);

module.exports = router;
