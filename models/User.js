const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please provide an email!"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password!"],
      minlength: [6, "password must be at least 6 characters long!"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "read-only-admin", "root-admin"],
        message: "Invalid role!",
      },
      required: [true, "please provide a valid role!"],
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
