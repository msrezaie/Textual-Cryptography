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

// api documentation: swagger
const swaggerDocument = require("yamljs").load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");

// imports
const generateAdmins = require("./util/generateAdmins");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mainRoutes = require("./routes/mainRoutes");
const historyRoutes = require("./routes/historyRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
  })
);
app.use(helmet());
app.use(
  cors({
    origin: "https://text-crypt.netlify.app/",
    optionsSuccessStatus: 200,
  })
);
app.use(xss());

app.get("/", (req, res) => {
  res.send(
    '<h2>Welcome to Textual Cryptography API</h2><a href="/api-docs">Documentation</a>'
  );
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cryptography", mainRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/history", historyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await generateAdmins();
    app.listen(PORT, console.log(`server listening in port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
