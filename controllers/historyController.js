const History = require("../models/History");

// @desc    get all the saved encryption/decryption usage of a user
// @route   GET /api/v1/history
// @access  authenticated users only
const getAllHistory = async (req, res) => {
  const history = await History.find({ userId: req.user.userId });
  res.json({ count: history.length, history: history });
};

// @desc    save encryption/decryption usage of a user
// @route   POST /api/v1/history/save
// @access  authenticated users only
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
// @route   DELETE /api/v1/history/delete/:id
// @access  authenticated users only
const deleteHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const historyExists = await History.findByIdAndDelete({ _id: id });
    if (!historyExists) {
      res.status(404);
      throw new Error("Invalid history id!");
    }
    res.status(200).json({ msg: "History deleted!" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

// @desc    deletes all encryption/decryption usage history of a user
// @route   DELETE /api/v1/history/deleteAll/:userId
// @access  authenticated users only
const deleteAllHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    await History.deleteMany({ userId });

    res.status(200).json({ msg: "All history deleted!" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  getAllHistory,
  saveHistory,
  deleteHistory,
  deleteAllHistory,
};
