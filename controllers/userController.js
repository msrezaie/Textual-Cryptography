const User = require("../models/User");
const History = require("../models/History");
const validator = require("validator");

// @desc    get authenticated user's detail
// @route   GET /api/v1/user/getCurrentUser
// @access  authenticated users only
const getCurrentUser = async (req, res) => {
  const validUser = await User.findOne({ _id: req.user.userId });
  return res
    .status(200)
    .json({ email: validUser.email, isAdmin: validUser.isAdmin });
};

// @desc    removes existing cipher file from disk and db
// @route   DELETE /api/v1/user/delete/:email
// @access  authenticated users only
const deleteAccount = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(400);
    throw new Error("User email must be provided!");
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(404);
    throw new Error(`User with ${email} email does not exist!`);
  } else if (userExists.email === process.env.ADMIN_E) {
    res.status(403);
    throw new Error(`Action not allowed!`);
  }
  try {
    await User.findOneAndDelete({ email });
    await History.deleteMany({ userId: userExists._id });
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

  if (!email || !userEmail) {
    res.status(400);
    throw new Error("Email must be provided!");
  } else if (!validator.isEmail(userEmail)) {
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

module.exports = { getCurrentUser, updateUser, deleteAccount };
