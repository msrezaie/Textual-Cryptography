const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateReadAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: payload.id });
  if (!user) {
    res.status(401);
    throw new Error("Authentication failed!");
  } else if (user.role !== "user") {
    return next();
  }
  res.status(403);
  throw new Error("unauthorized access!");
};

const authenticateRootAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: payload.id });
  if (!user) {
    res.status(401);
    throw new Error("Authentication failed!");
  } else if (user.role === "root-admin") {
    return next();
  }
  res.status(403);
  throw new Error("Root Admin access required!");
};

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: payload.id });
  if (!user) {
    res.status(401);
    throw new Error("Authentication failed!");
  } else if (user.role === "user") {
    req.user = { userId: payload.id };
    return next();
  }
  res.status(403);
  throw new Error("Non-user access is denied!");
};

module.exports = {
  authenticateUser,
  authenticateReadAdmin,
  authenticateRootAdmin,
};
