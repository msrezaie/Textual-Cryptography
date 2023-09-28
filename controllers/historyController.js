const History = require("../models/History");

// @desc    get all the saved encryption/decryption usage of a user
// @route   GET /api/v1/user/history
// @access  users only
const getAllHistory = async (req, res) => {
  const history = await History.find({ userId: req.user.userId });
  res.json({ count: history.length, history: history });
};

// @desc    save encryption/decryption usage of a user
// @route   POST /api/v1/user/history
// @access  users only
const saveHistory = async (req, res) => {
  let { cipher, plaintext, keys, ciphertext } = req.body;
  const [first, second] = Object.entries(keys);
  keys =
    !first[1] && !second[1]
      ? ""
      : !second[1]
      ? first[1]
      : `Key1: ${second[1]} Key2: ${second[1]}`;
  const savedHistory = await History.create({
    userId: req.user.userId,
    plaintext,
    cipher,
    keys,
    ciphertext,
  });
  res.json(savedHistory);
};

module.exports = { getAllHistory, saveHistory };
