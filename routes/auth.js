const express = require("express");
<<<<<<< HEAD
=======
const { isAuthenticated } = require("../middlewares");
>>>>>>> aea812a06c1b0d888643c6c7d30673c8d16cc5e4

const router = express.Router();

// Nano: Import express validator to check types of input variables
const { body } = require("express-validator");

<<<<<<< HEAD
const { userRegister, userLogin } = require("../controllers/auth");
=======
const { userRegister, getAuth, userData } = require("../controllers/auth");
>>>>>>> aea812a06c1b0d888643c6c7d30673c8d16cc5e4

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
<<<<<<< HEAD
  userLogin
);

=======
  getAuth
);

router.get("/me", isAuthenticated, userData);

>>>>>>> aea812a06c1b0d888643c6c7d30673c8d16cc5e4
module.exports = router;
