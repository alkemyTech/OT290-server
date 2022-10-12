const express = require("express");
const router = express.Router();

const {
  getAllNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news");
const { getCommentsFromNews } = require("../controllers/comments");
const { body } = require("express-validator");




/**
 * @openapi
 * /news:
 *  get:
 *     tags:
 *     - News
 *     description: Obtener todas las noticias.
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: Solicita el numero de pagina de las noticias.
 *       required: false
 *     responses:
 *       200:
 *         description: Información de todas las noticias obtenidas satisfactoriamente.
 *         content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: array
 *                    description: Array de noticias.
 *                    items:
 *                      type: object
 *                      description: Noticia.
 *                      properties:
 *                        id:
 *                          type: string
 *                          example: 2
 *                          description: Id de la noticia
 *                        name:
 *                          type: string
 *                          example: Test News
 *                          description: Nombre de la noticia
 *                        image:
 *                          type: string
 *                          example: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                          description: Imagen de la noticia
 *                        content:
 *                          type: string
 *                          example: Lorem ipsum sit amet
 *                          description: Contenido de la noticia
 *                        createdAt:
 *                          type: string
 *                          example: 2022-10-03T23:13:50.000Z
 *                          description: Fecha Creada
 *                        updatedAt:
 *                          type: string
 *                          example: 2022-10-03T23:13:50.000Z
 *                          description: Fecha Actualizada
 *                        deletedAt:
 *                          type: string
 *                          example: 2022-10-03T23:13:50.000Z
 *                          description: Fecha de borrado
 *                        categoryId:
 *                          type: integer
 *                          example: 1
 *                          description: El Id relacionado a la categoría
 *                  next:
 *                    type: string
 *                    example: http://localhost:3000/news?page=2
 *                    description: La siguiente pagina con nuevos Registros
 *                  last:
 *                    type: string
 *                    example: http://localhost:3000/news?page=1
 *                    description: La anterior pagina con anteriores Registros
 *       500:
 *         description: Error al obtener informacion de todas las noticias.
 *
 */
 router.get("/", getAllNews);
/**
 * @openapi
 * /news/{id}/comments:
 *  get:
 *     tags:
 *     - News
 *     description: Obtener todos los comentarios de una noticia.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: El Id de la noticia.
 *       required: true
 *     responses:
 *       200:
 *         description: Información de todos los comentarios acerca de la noticia obtenidas satisfactoriamente.
 *         content:
 *          application/json:
 *             schema:
 *                type: object
 *                description: The user ID.
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 2
 *                    description: Id del comentario
 *                  newsId:
 *                    type: integer
 *                    example: 2
 *                    description: Id de la noticia
 *                  userId:
 *                    type: integer
 *                    example: 2
 *                    description: Id del usuario
 *                  body:
 *                    type: string
 *                    example: "Hola este es un comentario"
 *                    description: Cuerpo del comentario
 *                  postId:
 *                    type: integer
 *                    example: 1
 *                    description: Imagen de la noticia
 *                  createdAt:
 *                    type: string
 *                    example: 2022-10-03T23:13:50.000Z
 *                    description: Fecha creada
 *                  updatedAt:
 *                    type: string
 *                    example: 2022-10-03T23:13:50.000Z
 *                    description: Fecha actualizada
 *                  deletedAt:
 *                    type: string
 *                    example: 2022-10-03T23:13:50.000Z
 *                    description: Fecha de borrado
 *       500:
 *         description: Error al obtener comentarios de la noticias.
 *
 */

router.get("/:id/comments", getCommentsFromNews);

/**
 * @openapi
 * /news/{id}:
 *  get:
 *     tags:
 *     - News
 *     description: Obtener una noticia en particular.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: El Id de la noticia.
 *       required: true
 *     responses:
 *       200:
 *         description: Información de la noticia
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: Noticia.
 *              properties:
 *                id:
 *                  type: string
 *                  example: 2
 *                  description: Id de la noticia
 *                name:
 *                  type: string
 *                  example: Test News
 *                  description: Nombre de la noticia
 *                image:
 *                  type: string
 *                  example: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  description: Imagen de la noticia
 *                content:
 *                  type: string
 *                  example: Lorem ipsum sit amet
 *                  description: Contenido de la noticia
 *                createdAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Creada
 *                updatedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Actualizada
 *                deletedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha de borrado
 *                categoryId:
 *                  type: integer
 *                  example: 1
 *                  description: El Id relacionado a la categoría
 *       500:
 *         description: Error al obtener comentarios de la noticias.
 *
 */
router.get("/:id", getNews);

/**
 * @openapi
 * /news:
 *  post:
 *     tags:
 *     - News
 *     description: Crear una noticia.
 *     requestBody:
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: La noticia
 *                  description: Nombre de la noticia
 *                image:
 *                  type: string
 *                  example: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  description: Imagen de la noticia
 *                content:
 *                  type: string
 *                  example: Lorem ipsum sit amet
 *                  description: Contenido de la noticia
 *                categoryId:
 *                  type: integer
 *                  example: 1
 *                  description: El Id relacionado a la categoría
 *       description: Cuerpo de la noticia.
 *       required: true
 *     responses:
 *       201:
 *         description: Noticia Creada
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: Noticia.
 *              properties:
 *                id:
 *                  type: string
 *                  example: 2
 *                  description: Id de la noticia
 *                name:
 *                  type: string
 *                  example: Test News
 *                  description: Nombre de la noticia
 *                image:
 *                  type: string
 *                  example: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  description: Imagen de la noticia
 *                content:
 *                  type: string
 *                  example: Lorem ipsum sit amet
 *                  description: Contenido de la noticia
 *                createdAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Creada
 *                updatedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Actualizada
 *                deletedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha de borrado
 *                categoryId:
 *                  type: integer
 *                  example: 1
 *                  description: El Id relacionado a la categoría\
 *       404:
 *         description: No se encuentra la Noticia.
 *       500:
 *         description: Error al crear la noticia.
 *
 */

router.post("/",
  body("name").notEmpty(),
  body("content").notEmpty(),
  body("image").notEmpty(),
  body("categoryId").notEmpty(),
  createNews);

/**
 * @openapi
 * /news/{id}:
 *  put:
 *     tags:
 *     - News
 *     description: Actualizar una noticia.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: El Id de la noticia.
 *       required: true
 *     requestBody:
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: La noticia
 *                  description: Nombre de la noticia
 *                image:
 *                  type: string
 *                  example: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  description: Imagen de la noticia
 *                content:
 *                  type: string
 *                  example: Lorem ipsum sit amet
 *                  description: Contenido de la noticia
 *                categoryId:
 *                  type: integer
 *                  example: 1
 *                  description: El Id relacionado a la categoría
 *       description: Cuerpo de la noticia.
 *       required: true
 *     responses:
 *       200:
 *         description: Noticia Creada
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: Noticia.
 *              properties:
 *                id:
 *                  type: string
 *                  example: 2
 *                  description: Id de la noticia
 *                name:
 *                  type: string
 *                  example: Test News
 *                  description: Nombre de la noticia
 *                image:
 *                  type: string
 *                  example: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  description: Imagen de la noticia
 *                content:
 *                  type: string
 *                  example: Lorem ipsum sit amet
 *                  description: Contenido de la noticia
 *                createdAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Creada
 *                updatedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Actualizada
 *                deletedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha de borrado
 *                categoryId:
 *                  type: integer
 *                  example: 1
 *                  description: El Id relacionado a la categoría
 *       404:
 *         description: No se encuentra la Noticia.
 *       500:
 *         description: Error al crear la noticia.
 *
 */

router.put("/:id", updateNews);

/**
 * @openapi
 * /news/{id}:
 *  delete:
 *     tags:
 *     - News
 *     description: Borrar una noticia.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: El Id de la noticia.
 *       required: true
 *     responses:
 *       200:
 *         description: Noticia Creada
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              description: Noticia.
 *              properties:
 *                id:
 *                  type: string
 *                  example: 2
 *                  description: Id de la noticia
 *                name:
 *                  type: string
 *                  example: Test News
 *                  description: Nombre de la noticia
 *                image:
 *                  type: string
 *                  example: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  description: Imagen de la noticia
 *                content:
 *                  type: string
 *                  example: Lorem ipsum sit amet
 *                  description: Contenido de la noticia
 *                createdAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Creada
 *                updatedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha Actualizada
 *                deletedAt:
 *                  type: string
 *                  example: 2022-10-03T23:13:50.000Z
 *                  description: Fecha de borrado
 *                categoryId:
 *                  type: integer
 *                  example: 1
 *                  description: El Id relacionado a la categoría
 *       404:
 *         description: No se encuentra la Noticia.
 *       500:
 *         description: Error al borrar la noticia.
 *
 */

router.delete("/:id", deleteNews);

module.exports = router;
