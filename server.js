require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");

// exports
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mainRoutes = require("./routes/mainRoutes");
const historyRoutes = require("./routes/historyRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cryptography", mainRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", historyRoutes);

app.use(errorHandler);
app.use(notFound);

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      await User.create({
        name: process.env.ADMIN_NAME,
        password: process.env.ADMIN_PASSWORD,
        isAdmin: true,
      });
      console.log("admin user generated!");
    }
    app.listen(PORT, console.log(`server listening in port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
