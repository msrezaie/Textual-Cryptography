const mongoose = require("mongoose");

const cipherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name!"],
    minlength: 3,
    maxlength: 24,
  },
  description: { type: String, default: "cipher description" },
  operation: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Operation",
      required: [true, "please provide an operation name!"],
    },
  ],
});

module.exports = mongoose.model("Cipher", cipherSchema);
