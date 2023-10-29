const User = require("../models/User");
const History = require("../models/History");
const OTP = require("../models/OneTimePassword");
const generateOTP = require("../util/generateOTP");

const validator = require("validator");
const sendgrid = require("@sendgrid/mail");

// @desc    removes existing cipher file from disk and db
// @route   DELETE /api/v1/user/delete/:email
// @access  authenticated users only
const deleteAccount = async (req, res) => {
  const { email } = req.params;

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Please provide a valid email!");
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404);
    throw new Error(`User with ${email} email does not exist!`);
  }
  try {
    await User.findOneAndDelete({ email });
    await History.deleteMany({ userId: userExists._id });
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: new Date(0),
      secure: process.env.PRODUCTION_ENV === "production",
    });
    res.status(200).json({ msg: `User account removed!` });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

// @desc    updates authenticated user's saved information
// @route   PATCH /api/v1/user/update/:email
// @access  authenticated users only
const updateUser = async (req, res) => {
  const { email } = req.params;
  const { userEmail } = req.body;

  if (
    !userEmail ||
    !validator.isEmail(userEmail) ||
    !validator.isEmail(email)
  ) {
    res.status(400);
    throw new Error("Please provide a valid email!");
  } else {
    try {
      const userUpdated = await User.findOneAndUpdate(
        { email },
        { email: userEmail }
      );

      if (!userUpdated) {
        res.status(404);
        throw new Error(`user with ${email} email does not exist!`);
      }
      res.status(200).json({ msg: "user info updated!" });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  }
};

// @desc    sends an email containing password reset OTP
// @route   POST /api/v1/user/sendOTP
// @access  public
const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    res.status(400);
    throw new Error("A valid User email must be provided!");
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404);
    throw new Error(`User with ${email} email does not exist!`);
  } else {
    try {
      sendgrid.setApiKey(process.env.SMTP_API_KEY);
      const generatedOTP = generateOTP();
      const { otp, expiresAt, purgeAt } = generatedOTP;

      let otpRecord = await OTP.findOne({ email });
      if (!otpRecord) {
        otpRecord = new OTP({ email, ...generatedOTP });
      } else {
        otpRecord.otp = otp;
        otpRecord.expiresAt = expiresAt;
        otpRecord.purgeAt = purgeAt;
      }
      await otpRecord.save();

      const emailTemplate = {
        to: email,
        from: process.env.SMTP_SENDER,
        subject: "Reset your TextCrypt password",
        text: `Hi there,\n\nHere is your One Time Password (OTP):\n\n${otp}\n\nThis OTP will expire in 30 minutes. If you did not request a password reset, you can safely ignore this email.\n\nBest,\n\nThe TextCrypt Team`,
      };

      await sendgrid.send(emailTemplate);

      res.json({
        msg: `OTP is sent to ${email} (please also check your spam folder!)`,
      });
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  }
};

// @desc    validates received OTP
// @route   POST /api/v1/user/validateOTP
// @access  public (OTP required)
const validateOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !validator.isEmail(email)) {
    res.status(400);
    throw new Error("A valid User email must be provided!");
  } else if (!otp) {
    res.status(400);
    throw new Error("OTP must be provided!");
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404);
    throw new Error(`User with ${email} email does not exist!`);
  }

  const otpRecord = await OTP.findOne({ email });

  if (!otpRecord) {
    res.status(404);
    throw new Error(`${email} not yet verified!`);
  } else if (
    !(await otpRecord.compareOTP(otp)) ||
    new Date() > otpRecord.expiresAt
  ) {
    res.status(400);
    throw new Error("Invalid OTP!");
  }
  res.json({ otpVerified: true, otp });
};

// @desc    validates the OTP and resets user password
// @route   PATCH /api/v1/user/resetPassword/:email
// @access  public (OTP required)
const resetPassword = async (req, res) => {
  const { email } = req.params;
  const { otp, newPassword } = req.body;

  if (!email || !validator.isEmail(email)) {
    res.status(400);
    throw new Error("A valid User email must be provided!");
  } else if (!otp) {
    res.status(400);
    throw new Error("OTP must be provided!");
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404);
    throw new Error(`User with ${email} email does not exist!`);
  }

  const otpRecord = await OTP.findOne({ email });
  if (!otpRecord) {
    res.status(404);
    throw new Error(`${email} not yet verified!`);
  } else if (
    !(await otpRecord.compareOTP(otp)) ||
    new Date() > otpRecord.expiresAt
  ) {
    res.status(400);
    throw new Error("Invalid OTP!");
  } else if (!newPassword) {
    res.status(400);
    throw new Error("New Password must be provided!");
  }

  userExists.password = newPassword;
  await userExists.save();

  await OTP.findOneAndDelete({ email });

  res.json({ msg: `User password updated!` });
};

module.exports = {
  updateUser,
  deleteAccount,
  sendOTP,
  validateOTP,
  resetPassword,
};
