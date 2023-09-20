const fs = require("fs").promises;
const Method = require("../models/Method");

// @desc    creates a method resource with its information
// @route   POST /api/v1/admin/method/create
// @access  private (admin only)
const createMethod = async (req, res) => {
  let { name, description, ciphers } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("name must be provided!");
  }

  name = name.toLowerCase();
  const method = await Method.create({ name, description, ciphers });
  res.status(201).json({ msg: `${name} method saved` });
};

// @desc    deletes a method resource with its name
// @route   DELETE /api/v1/admin/method/delete/:name
// @access  private (admin only)
const removeMethod = async (req, res) => {
  let { name } = req.params;

  if (!name) {
    res.status(400);
    throw new Error("name must be provided!");
  }

  name = name.toLowerCase();
  const method = await Method.findOneAndDelete({ name });
  if (!method) {
    res.status(404);
    throw new Error("no resource with given name!");
  }
  res.status(200).json({ msg: `${name} method removed` });
};

// @desc    creates a cipher file with its information
// @route   PATCH/PUT /api/v1/admin/cipher/create
// @access  private (admin only)
const createCipher = async (req, res) => {
  let { methodName, cipherName, description } = req.body;
  methodName = methodName.toLowerCase();
  cipherName = cipherName.toLowerCase();
  if (!cipherName) {
    res.status(400);
    throw new Error("cipher name must be provided!");
  } else if (!methodName) {
    res.status(400);
    throw new Error("method name must be provided!");
  } else if (!req.file) {
    res.status(400);
    throw new Error("cipher file must be provided!");
  } else {
    const methodExists = await Method.findOne({ name: methodName });

    if (!methodExists) {
      res.status(404);
      throw new Error(`${methodName} method does not exist!`);
    } else if (
      methodExists.ciphers.filter((cipher) => cipher.name === cipherName)[0]
    ) {
      res.status(400);
      throw new Error(`${cipherName} cipher already exists!`);
    }

    const newCipher = {
      name: cipherName,
      description: description,
      filePath: req.file.path,
    };

    await Method.findOneAndUpdate(
      { name: methodName },
      { $push: { ciphers: newCipher } },
      { new: true }
    );
    res.status(201).json({ msg: `${cipherName} added to ${methodName}!` });
  }
};

// @desc    removes existing cipher file from disk
// @route   DELETE /api/v1/admin/cipher/delete/:name
// @access  private (admin only)
const removeCipher = async (req, res) => {
  let { methodName, cipherName } = req.params;
  methodName = methodName.toLowerCase();
  cipherName = cipherName.toLowerCase();

  if (!methodName || !cipherName) {
    res.status(400);
    throw new Error("method & cipher name must be provided!");
  }
  const method = await Method.findOne({ name: methodName });

  if (!method) {
    res.status(404);
    throw new Error(`${methodName} method does not exist!`);
  } else {
    const cipher = method.ciphers.filter(
      (cipher) => cipher.name === cipherName
    );
    if (!cipher[0]) {
      res.status(404);
      throw new Error(`${cipherName} does not exist in ${methodName}!`);
    }
    try {
      const newCiphers = method.ciphers.filter(
        (cipher) => cipher.name !== cipherName
      );
      await fs.unlink(cipher[0].filePath);

      const updatedMethod = await Method.findOneAndUpdate(
        { name: methodName },
        { $set: { ciphers: newCiphers } },
        { new: true }
      );
      res
        .status(200)
        .json({ msg: `${cipherName} removed!`, update: updatedMethod });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  }
};

module.exports = { createMethod, removeMethod, createCipher, removeCipher };
