const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decodedToken.id, name: decodedToken.name };
    next();
  } catch (error) {
    res.status(401);
    throw new Error("no valid token found!");
  }
};

const authenticateAdmin = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("no valid token found!");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.name !== "admin") {
      res.status(401);
      throw new Error("unauthorized access!");
    }
    req.user = { id: decodedToken.id, name: decodedToken.name };
    next();
  } catch (error) {
    res.status(401);
    throw new Error("unauthorized access!");
  }
};

module.exports = { authenticateUser, authenticateAdmin };
