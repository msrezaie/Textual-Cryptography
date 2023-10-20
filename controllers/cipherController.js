const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const Cipher = require("../models/Cipher");

// @desc    retrieve all info about ciphers
// @route   GET /api/v1/cryptography/ciphers
// @access  public
const getAllCiphers = async (req, res) => {
  const ciphers = await Cipher.find();
  if (!ciphers) {
    res.status(404);
    throw new Error("no cipher found!");
  }

  res.json({ count: ciphers.length, ciphers });
};

// @desc    performs encrypt/decryption with the provided arguments
// @route   POST /api/v1/cryptography
// @access  public
const transformText = (req, res) => {
  let { cipherName, operation, message, keys } = req.body;
  cipherName = cipherName.toLowerCase();

  if (!cipherName || !operation || !message || !keys) {
    res.status(400);
    throw new Error("required arguements not received!");
  }
  const cipherPath = path.join(__dirname, `../uploads/${cipherName}.py`);

  if (!fs.existsSync(cipherPath)) {
    res.status(404);
    throw new Error(`${cipherName} does not exist!`);
  }

  keys = JSON.stringify(keys);
  const cipherProcess = spawn("python", [cipherPath, operation, message, keys]);

  let cipherOutput = "";

  cipherProcess.stdout.on("data", (data) => {
    cipherOutput += data.toString();
  });

  cipherProcess.on("close", (code) => {
    if (code === 0) {
      res.status(200).json({ result: cipherOutput.replace(/\r\n/g, "") });
    } else {
      return res.status(500).json({
        error: "execution failed, check input and keys!",
      });
    }
  });
};

module.exports = { getAllCiphers, transformText };
