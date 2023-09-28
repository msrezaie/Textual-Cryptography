const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name!"],
      minlength: 3,
      maxlength: 24,
    },
    password: {
      type: String,
      required: [true, "please provide a password!"],
      minlength: 8,
      maxlength: 16,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (inputtedPassword) {
  return await bcrypt.compare(inputtedPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
