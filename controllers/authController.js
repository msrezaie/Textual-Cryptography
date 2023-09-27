const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(201).json({ name: user.name, token });
  console.log("new user registered!");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("please provide email and password!");
  }

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { id: "0001", name: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.status(200).json({
      user: {
        name: "admin",
      },
      token,
    });
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("invalid email or password!");
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      res.status(400);
      throw new Error("invalid password!");
    }

    const token = user.createJWT();
    res.status(200).json({
      user: {
        name: user.name,
      },
      token,
    });
  }
};

module.exports = { login, register };
