require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// exports
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const authRoutes = require("./routes/auth-routes");

app.use(express.json());

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/cryptography");

app.use("/", (req, res) => {
  res.send("home page");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, console.log(`server is listening in port: ${PORT}`));
  } catch (error) {}
};

start();
