require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.json({ msg: "hello world" });
});

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, console.log(`server is listening in port: ${PORT}`));
  } catch (error) {}
};

start();
