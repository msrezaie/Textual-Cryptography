const User = require("../models/User");
const generateCookie = require("../util/generateCookie");

// @desc    creates token, cookie registers users
// @route   POST /api/v1/auth/register
// @access  private (admin only)
const register = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("please provide name and password!");
  } else if (await User.findOne({ name })) {
    res.status(400);
    throw new Error(`${name} already exists!`);
  }

  const user = await User.create({ name, password });
  const token = user.createJWT();
  generateCookie({ res, token });
  res.status(201).json({ name: user.name, isAdmin: user.isAdmin });
  console.log("new user registered!");
};

// @desc    creates token and cookie for existing users
// @route   POST /api/v1/auth/login
// @access  registered users only
const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("please provide name and password!");
  }

  const user = await User.findOne({ name });
  if (user && (await user.comparePassword(password))) {
    const token = user.createJWT();
    generateCookie({ res, token });
    res.status(200).json({ name: user.name, isAdmin: user.isAdmin });
  } else {
    res.status(400);
    throw new Error("invalid name or password!");
  }
};

// @desc    destroys authenticated user cookie
// @route   GET /api/v1/auth/logout
// @access  authenticated users only
const logout = async (req, res) => {
  res.cookie(
    "jwt",
    {},
    {
      httpOnly: true,
      maxAge: new Date(0),
    }
  );
  res.status(200).json({ msg: "logged off!" });
};

// @desc    get authenticated user detail
// @route   GET /api/v1/auth/getCurrentUser
// @access  authenticated users only
const getCurrentUser = async (req, res) => {
  const validUser = await User.findOne({ _id: req.user.userId });
  return res
    .status(200)
    .json({ name: validUser.name, isAdmin: validUser.isAdmin });
};

module.exports = { login, register, getCurrentUser, logout };
