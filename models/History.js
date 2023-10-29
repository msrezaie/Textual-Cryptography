const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    userId: {
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
      type: mongoose.Schema.Types.Object,
    },
    ciphertext: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
