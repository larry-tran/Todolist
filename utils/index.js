const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("dotenv");

config();

const createToken = ({ id, email }) => {
  return jwt.sign({ userId: id, email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const verifyToken = (token) => {
  return (decoded = jwt.verify(token, process.env.JWT_SECRET, {
    expiresIn: "24h",
  }));
};

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = { createToken, verifyToken, hashPassword, comparePassword };
