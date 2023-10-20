const User = require("../models/User");
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
    const userUpdated = await User.findOneAndUpdate(
      { email },
      { email: userEmail }
    );

    if (!userUpdated) {
      res.status(404);
      throw new Error(`user with ${email} email does not exist!`);
    }
    console.log(userUpdated);
    res.status(200).json({ msg: "user info updated!" });
  }
};

module.exports = { getCurrentUser, updateUser };
