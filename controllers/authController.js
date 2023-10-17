const User = require("../models/User");
const generateCookie = require("../util/generateCookie");

// @desc    creates token, cookie and registers users
// @route   POST /api/v1/auth/signup
// @access  public
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please provide email and password!");
  } else if (await User.findOne({ email })) {
    res.status(400);
    throw new Error(`user with ${email} email already exists!`);
  }

  const user = await User.create({ email, password });
  const token = user.createJWT();
  generateCookie({ res, token });
  res.status(201).json({ email: user.email, isAdmin: user.isAdmin });
};

// @desc    creates token and cookie for existing users
// @route   POST /api/v1/auth/login
// @access  public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please provide email and password!");
  }

  const user = await User.findOne({ email }).select("+password");
  if (user && (await user.comparePassword(password))) {
    const token = user.createJWT();
    generateCookie({ res, token });
    res.status(200).json({ email: user.email, isAdmin: user.isAdmin });
  } else {
    res.status(400);
    throw new Error("invalid email or password!");
  }
};

// @desc    destroys authenticated user cookie
// @route   POST /api/v1/auth/logout
// @access  authenticated users only
const logout = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: new Date(0),
    secure: process.env.PRODUCTION_ENV === "production",
  });
  res.status(200).json({ msg: "logged out!" });
};

// @desc    get authenticated user detail
// @route   GET /api/v1/auth/getCurrentUser
// @access  authenticated users only
const getCurrentUser = async (req, res) => {
  const validUser = await User.findOne({ _id: req.user.userId });
  return res
    .status(200)
    .json({ email: validUser.email, isAdmin: validUser.isAdmin });
};

module.exports = { login, signup, getCurrentUser, logout };
