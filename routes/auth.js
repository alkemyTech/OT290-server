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
 *       500:
 *         description: Error al registrar usuario
 */
router.post(
  "/register",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  userRegister
);
/**
 * @openapi
 * /auth/login:
 *  post:
 *     tags:
 *     - Auth
 *     description: Login de usuario
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                required:
 *                  - email
 *                  - password
 *                properties:
 *                  email:
 *                    type: string
 *                  password:
 *                    type: string
 *     responses:
 *       401.1:
 *         description: Usuario no existente
 *       400:
 *         description: Error de validacion
 *       200:
 *         description: Login realizado satisfactoriamente
 */
router.post(
  "/login",
  body("email").isEmail(), // username must be an email
  body("password").isLength({ min: 5 }), // password must be at least 5 chars long
  userLogin
);
/**
 * @openapi
 * /auth/me:
 *  get:
 *     tags:
 *     - Auth
 *     description: Informacion de usuario logueado
 *     responses:
 *       404:
 *         description: Usario no encontrado
 *       500:
 *         description: Error al obtener informacion de usuario logueado
 *       200:
 *         description: Informacion de usuario logueado obtenida satisfactoriamente
 */
router.get("/me", isAuthenticated, userData);

module.exports = router;
