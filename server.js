require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// exports
// const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mainRoutes = require("./routes/mainRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");
// const {
//   authenticateUser,
//   authenticateAdmin,
// } = require("./middleware/authHandler");

// app.use(express.static("./public"));
// app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cryptography", mainRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, console.log(`server listening in port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
