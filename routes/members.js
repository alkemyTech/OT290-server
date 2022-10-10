var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const { isAdmin } = require("../middlewares/isAdmin");

const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/members");
/**
 * @openapi
 * /members:
 *  get:
 *     authorization: Bearer <token>
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Members
 *     description: Obtener todas las miembros.
 *     responses:
 *       500:
 *         description: Error al obtener informacion de todas las miembros.
 *       404:
 *         description: Error al obtener la pagina solicitada.
 *       200:
 *         description: Información de todas las miembros obtenidas satisfactoriamente.
 *
 */
router.get("/", isAdmin, getMembers);
/**
 * @openapi
 * /members/{id}:
 *  get:
 *     tags:
 *     - Members
 *     description: Obtiene un miembro concreto.
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Solicita el id de un miembro existente.
 *       required: true
 *     responses:
 *       500:
 *         description: Error al obtener informacion de todas las miembros.
 *       404:
 *         description: Error al obtener la pagina solicitada.
 *       200:
 *         description: Información de todas las miembros obtenidas satisfactoriamente.
 *
 */
router.get("/:id", getMember);

/**
 * @openapi
 * /members:
 *  post:
 *     tags:
 *     - Members
 *     description: Registrar una nuevo miembro.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                required:
 *                  - name
 *                properties:
 *                  name:
 *                    type: string
 *                  facebookUrl:
 *                    type: string
 *                  instagramUrl:
 *                    type: string
 *                  linkedinUrl:
 *                    type: string
 *                  image:
 *                    type: string
 *                  description:
 *                    type: string
 *     responses:
 *       201:
 *         description: Miembro creado exitosamente.
 *       400:
 *         description: Error en los datos enviados de la nuevo miembro.
 *       500:
 *         description: Error al registrar nueva miembro.
 */
router.post("/", body("name").notEmpty().isString(), isAdmin, createMember);
/**
 * @openapi
 * /members/{id}:
 *  put:
 *     tags:
 *     - Members
 *     description: Actualizar una nuevo miembro.
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Solicita el id de un miembro existente.
 *       required: true
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                required:
 *                  - name
 *                properties:
 *                  name:
 *                    type: string
 *                  facebookUrl:
 *                    type: string
 *                  instagramUrl:
 *                    type: string
 *                  linkedinUrl:
 *                    type: string
 *                  image:
 *                    type: string
 *                  description:
 *                    type: string
 *     responses:
 *       201:
 *         description: Miembro creado exitosamente.
 *       400:
 *         description: Error en los datos enviados de la nuevo miembro.
 *       500:
 *         description: Error al registrar nueva miembro.
 */
router.put("/:id", updateMember);
/**
 * @openapi
 * /members/{id}:
 *  delete:
 *     tags:
 *     - Members
 *     description: Elimina un miembro.
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Solicita el id de un miembro existente.
 *       required: true
 *     responses:
 *       201:
 *         description: Miembro eliminado exitosamente.
 *       400:
 *         description: Error en los datos enviados de la nuevo miembro.
 *       500:
 *         description: Error al registrar nueva miembro.
 */
router.delete("/:id", isAdmin, deleteMember);

module.exports = router;
