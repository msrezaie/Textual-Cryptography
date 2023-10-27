const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const otpSchema = mongoose.Schema(
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
    otp: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    purgeAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

otpSchema.index({ purgeAt: 1 }, { expireAfterSeconds: 0 });

otpSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.otp = await bcrypt.hash(this.otp, salt);
});

otpSchema.methods.compareOTP = async function (receivedOTP) {
  return await bcrypt.compare(receivedOTP, this.otp);
};

module.exports = mongoose.model("OTP", otpSchema);
