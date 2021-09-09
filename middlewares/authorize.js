const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { config } = require("dotenv");
config();

const authorize = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  // Bearer wetnwoientewitmwemt
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    { expiresId: "24h" },
    (error, decoded) => {
      if (error) return res.status(401).send({ error });
      req.decoded = decoded;
      User.findByPk(decoded.userId).then((user) => {
        if (!user) {
          return res.status(401).send({ error: "User does not exist" });
        }
        next();
      });
    }
  );
};

module.exports = authorize;
