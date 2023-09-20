const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// @desc    retrieve all info about different methods
// @route   GET /api/v1/cryptography/methods
// @access  public
const getAllMethods = (req, res) => {
  res.json({ msg: "all methods" });
};

// @desc    retrieve individual info about different ciphers
// @route   GET /api/v1/cryptography/ciphers
// @access  public
const getCipher = (req, res) => {
  res.json({ msg: "all cipher" });
};

// @desc    performs encrypt/decryption with the provided arguments
// @route   POST /api/v1/cryptography
// @access  public
const transformText = (req, res) => {
  let { cipher, operation, message, keys } = req.body;

  if (!cipher || !operation || !message || !keys) {
    res.status(400);
    throw new Error("required arguements not received!");
  }
  const cipherPath = path.join(
    __dirname,
    `../uploads/${cipher.toLowerCase()}.py`
  );

  if (!fs.existsSync(cipherPath)) {
    res.status(404);
    throw new Error("cipher with given name does not exist!");
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
        error: "cipher execution failed, inputted arguments not validated!",
      });
    }
  });
};

module.exports = { getAllMethods, getCipher, transformText };
