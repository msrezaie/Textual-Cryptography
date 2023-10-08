const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    operation: {
      type: String,
    },
    plaintext: {
      type: String,
    },
    cipher: {
      type: String,
    },
    keys: {
      type: String,
    },
    ciphertext: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
