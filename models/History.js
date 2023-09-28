const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    userId: {
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
