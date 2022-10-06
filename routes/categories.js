const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
/**
 * @openapi
 * /categories:
 *  get:
 *     tags:
 *     - Categorias
 *     description: Obtener todas las categorias.
 *     parameters:
 *     - name: page
 *       in: query
 *       description: Nro de pagina solicitada sobre las categorias.
 *       required: false
 *     responses:
 *       500:
 *         description: Error al obtener informacion de todas las categorias.
 *       404:
 *         description: Error al obtener la pagina solicitada.
 *       200:
 *         description: Información de todas las categorias obtenidas satisfactoriamente.
 */
router.get("/", getCategories);
/**
 * @openapi
 * /categories/:id:
 *  get:
 *     tags:
 *     - Categorias
 *     description: Obtener todos los datos de una categoria en específico
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id unico de la categoria
 *        required: true
 *     responses:
 *       200:
 *         description: Informacion de categoria obtenida satisfactoriamente
 *       404:
 *         description: Categoria no encontrada.
 *       500:
 *         description: Error al obtener informacion de la categoria
 */
router.get("/:id", getCategory);
/**
 * @openapi
 * /categories:
 *  post:
 *     tags:
 *     - Categorias
 *     description: Registrar una nueva categoria.
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
 *                  description:
 *                    type: string
 *                  image:
 *                    type: string
 *     responses:
 *       201:
 *         description: Novedad creada exitosamente.
 *       400:
 *         description: Error en los datos enviados de la nueva categoria.
 *       500:
 *         description: Error al registrar nueva categoria.
 */
router.post(
  "/",
  body("name").exists(),
  body("name").notEmpty(),
  body("name").isString(),
  createCategory
);
/**
 * @openapi
 * /categories/:id:
 *  put:
 *     tags:
 *     - Categorias
 *     description: Actualizar una categoria en específico.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id de la categoria a actualizar.
 *        required: true
 *     requestBody:
 *        required:
 *          - name
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                required:
 *                  - name
 *                  - description
 *                  - image
 *                properties:
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
 *                  image:
 *                    type: string
 *     responses:
 *       200:
 *         description: Categoria edidata exitosamente.
 *       400:
 *         description: Error en los datos enviados de la categoria.
 *       404:
 *         description: Categoria a editar no encontrada en la base de datos.
 *       500:
 *         description: Error al editar la categoria.
 */
router.put(
  "/:id",

  body("name").isString(),
  updateCategory
);
/**
 * @openapi
 * /categories/:id:
 *  delete:
 *     tags:
 *     - Categorias
 *     description: Borrado de una categoria existente en la base de datos.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id de la categoria a borrar.
 *        required: true
 *     responses:
 *       200:
 *         description: Categoria borrada exitosamente.
 *       404:
 *         description: Categoria a borrar no encontrada en la base de datos.
 *       500:
 *         description: Error al borrar la categoria.
 */
router.delete("/:id", deleteCategory);

module.exports = router;
