const { User } = require("../models");
const { hashPassword, createToken, comparePassword } = require("../utils");

const auth = {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hash = hashPassword(password);
      const user = await User.create({ name, email, password: hash });
      const token = createToken(user);
      const { id } = user;
      return res.status(201).send({ token, user: { id, name, email } });
    } catch (e) {
      return next(new Error(e));
    }
  },

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user && comparePassword(password, user.password)) {
        const { name, id } = user;
        const token = createToken(user);
        return res.status(200).send({ token, user: { id, name, email } });
      }
      return res.status(400).send({ error: "invalid email/password" });
    } catch (e) {
      return next(new Error(e));
    }
  },
};

module.exports = auth;
