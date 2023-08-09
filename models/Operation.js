const mongoose = require("mongoose");

const operationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name!"],
    minlength: 3,
    maxlength: 24,
  },
  description: { type: String, default: "operation description" },
});

module.exports = mongoose.model("Operation", operationSchema);
