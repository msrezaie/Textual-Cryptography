const mongoose = require("mongoose");

const methodSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name!"],
    minlength: 3,
    maxlength: 24,
    unique: true,
  },
  description: { type: String, default: "method desc" },
  ciphers: [
    {
      name: { type: String },
      description: {
        type: String,
        default: "method desc",
      },
      filePath: {
        type: String,
        required: [true, "please provide a file!"],
      },
    },
  ],
});

module.exports = mongoose.model("Method", methodSchema);
