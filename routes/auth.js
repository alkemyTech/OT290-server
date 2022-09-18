const express = require("express");

const router = express.Router();

// Nano: Import express validator to check types of input variables
const { body } = require("express-validator");

const { userRegister } = require("../controllers/auth");

router.post(
  "/auth/register",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  userRegister
);

module.exports = router;
