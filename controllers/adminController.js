const fs = require("fs");
const Cipher = require("../models/Cipher");
const User = require("../models/User");

// @desc    creates a cipher file and add its information
// @route   POST /api/v1/admin/cipher/create
// @access  private (admin only)
const createCipher = async (req, res) => {
  let { cipherName, cipherDescription, keysDescription, keyType, keyArgs } =
    req.body;

  cipherName = cipherName.toLowerCase();
  if (!cipherName) {
    res.status(400);
    throw new Error("cipher name must be provided!");
  } else if (!req.file) {
    res.status(400);
    throw new Error("cipher file must be provided!");
  } else if (!keyType) {
    res.status(400);
    throw new Error("a valid key-type must be provided!");
  } else {
    const cipherExists = await Cipher.findOne({ name: cipherName });

    if (cipherExists) {
      res.status(400);
      throw new Error(`${cipherName} cipher already exists!`);
    }

    const newCipher = {
      name: cipherName,
      keyType,
      keyArgs,
      cipherDescription,
      keysDescription,
      filePath: req.file.path,
    };

    await Cipher.create(newCipher);
    res.status(201).json({ msg: `${cipherName} cipher added!` });
  }
};

// @desc    removes existing cipher file from disk and db
// @route   DELETE /api/v1/admin/cipher/delete/:cipherName
// @access  private (admin only)
const removeCipher = async (req, res) => {
  let { cipherName } = req.params;
  cipherName = cipherName.toLowerCase();

  if (!cipherName) {
    res.status(400);
    throw new Error("cipher name must be provided!");
  }
  const cipherExists = await Cipher.findOne({ name: cipherName });
  if (!cipherExists) {
    res.status(404);
    throw new Error(`${cipherName} does not exist!`);
  }
  try {
    const fileExists = fs.existsSync(cipherExists.filePath);

    if (fileExists) {
      await fs.promises.unlink(cipherExists.filePath);
    }

    await Cipher.findOneAndDelete({ name: cipherName });
    res.status(200).json({ msg: `${cipherName} removed!` });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

// @desc    updates existing cipher resource
// @route   UPDATE /api/v1/admin/cipher/update/:name
// @access  private (admin only)
const updateCipher = async (req, res) => {
  const { cipherName } = req.params;
  res.json({ msg: "update cipher reached", cipherName });
};

// @desc    gets all existing users
// @route   GET /api/v1/admin/users
// @access  private (admin only)
const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ count: users.length, users });
};

module.exports = { createCipher, updateCipher, removeCipher, getUsers };
