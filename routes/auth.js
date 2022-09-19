const express = require("express");

const router = express.Router();

// Nano: Import express validator to check types of input variables
const { body } = require("express-validator");

const { userRegister, getAuth } = require("../controllers/auth");

router.post(
  "/register",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  userRegister
);

router.post(
  "/login",
  body("email").isEmail(), // username must be an email
  body("password").isLength({ min: 5 }), // password must be at least 5 chars long
  getAuth
);

module.exports = router;