const mongoose = require("mongoose");

const cipherSchema = mongoose.Schema(
  {
    cipherName: {
      type: String,
      unique: true,
      required: [true, "please provide a name!"],
      minlength: 3,
      maxlength: 24,
    },
    keyType: {
      type: String,
      enum: {
        values: ["no-key", "1-key", "2-key", "4-key"],
        message: "Invalid key type!",
      },
      required: [true, "please provide a valid key type!"],
    },
    keyArgs: {
      type: mongoose.Schema.Types.Mixed,
    },
    cipherDescription: { type: String, default: "cipher desc" },
    keysDescription: { type: String, default: "keys desc" },
    filePath: {
      type: String,
      required: [true, "please provide a file!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cipher", cipherSchema);
