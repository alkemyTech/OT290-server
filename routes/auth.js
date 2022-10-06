const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = express.Router();

// Nano: Import express validator to check types of input variables
const { body } = require("express-validator");

const { userRegister, userLogin, userData } = require("../controllers/auth");

/**
 * @openapi
 * /auth/register:
 *  post:
 *     tags:
 *     - Auth
 *     description: Registrar un nuevo usuario
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                required:
 *                  - firstName
 *                  - lastNAme
 *                  - email
 *                  - password
 *                properties:
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *                  photo:
 *                    type: string
 *     responses:
 *       201:
 *         description: Usuario creado satisfactoriamente
 */
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
  userLogin
);

router.get("/me", isAuthenticated, userData);

module.exports = router;
