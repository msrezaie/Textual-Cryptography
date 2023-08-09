const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name!"],
    maxlength: 3,
    minlength: 24,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email!",
    ],
    unique: true,
    required: [true, "please provide an email!"],
  },
  password: {
    type: String,
    required: [true, "please provide a password!"],
    minlength: 8,
    maxlength: 16,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
