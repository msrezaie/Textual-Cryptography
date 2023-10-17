const History = require("../models/History");

// @desc    get all the saved encryption/decryption usage of a user
// @route   GET /api/v1/user/history
// @access  users only
const getAllHistory = async (req, res) => {
  const history = await History.find({ userId: req.user.userId });
  res.json({ count: history.length, history: history });
};

// @desc    save encryption/decryption usage of a user
// @route   POST /api/v1/user/history/save
// @access  users only
const saveHistory = async (req, res) => {
  const { userEmail, operation, cipher, plaintext, keys, ciphertext } =
    req.body;
  const savedHistory = await History.create({
    userId: req.user.userId,
    userEmail,
    operation,
    plaintext,
    cipher,
    keys,
    ciphertext,
  });
  res.json(savedHistory);
};

// @desc    deletes encryption/decryption usage of a user
// @route   DELETE /api/v1/user/history/delete/:id
// @access  users only
const deleteHistory = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("no history id given!");
  }
  try {
    const historyExists = await History.findByIdAndDelete({ _id: id });
    if (!historyExists) {
      res.status(404);
      throw new Error("invalid history id!");
    }
    res.status(200).json({ msg: "history deleted!" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = { getAllHistory, saveHistory, deleteHistory };
