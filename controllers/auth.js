const { User } = require("../models");
// Nano: Import bcrypt library to encrypt passwords
const bcrypt = require("bcrypt");
// Nano: Import express validator to check types of input variables
const { validationResult } = require("express-validator");

const userRegister = async (req, res) => {
  try {
    //Nano: Validate errors in request to stop if there's any
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    //Nano: Continue if no errors were found
    const { firstName, lastName, email, password, photo, roleId } = req.body;
    // Nano: Create salt and make hash to encrypt passwords
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);
    // Nano: Continue with user registry
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      photo,
      roleId,
    });
    user.save();
    return res.status(201).json({
      firstName,
      lastName,
      email,
      photo,
      roleId,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  userRegister,
};
