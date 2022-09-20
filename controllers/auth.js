const { User } = require("../models");
// Nano: Import express validator to check types of input variables
const { validationResult } = require("express-validator");
const { createUser } = require("./users");
const bcrypt = require("bcrypt");
const { signToken } = require("../helpers/auth");

const userRegister = async (req, res) => {
  try {
    //Nano: Validate errors in request to stop if there's any
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    // Nano: Continue with user registry
    const user = await createUser(req, res);
    if (user) {
      delete user.password;
      const token = signToken(user);
      return res.status(201).json(token);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const user = await User.findOne({ where: { email } });
    const pass = user.password;

    if (!user) {
      res.status(401.1).send("usuario no existe");
    } else if ((await bcrypt.compare(password, pass)) == true) {
      res.status(200).send({ ...user.dataValues, password: undefined });
    } else {
      res.status(401.1).send("ok:false");
    }
  } catch (error) {
    res.status(401.1).send("ok:false");
  }
};

module.exports = {
  userRegister,
  getAuth,
};
