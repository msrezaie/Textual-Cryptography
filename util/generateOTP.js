const crypto = require("crypto");

const generateOTP = () => {
  const otp = crypto.randomBytes(3).toString("hex").toUpperCase();
  const expiresAt = new Date(Date.now() + Number(process.env.OTP_EXPIRE_AFTER));
  const purgeAt = new Date(Date.now() + Number(process.env.OTP_PURGE_AFTER));

  return { otp, expiresAt, purgeAt };
};

module.exports = generateOTP;
