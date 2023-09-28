const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: payload.id });
  if (user.isAdmin) {
    return next();
  }
  res.status(403);
  throw new Error("unauthorized access!");
};

const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.id };
    next();
  } catch (error) {
    res.status(401);
    throw new Error("authentication failed!");
  }
};

module.exports = { authenticateUser, authenticateAdmin };
