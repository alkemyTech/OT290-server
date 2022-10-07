var express = require("express");
var router = express.Router();

const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonials");

router.get("/", getTestimonials);
router.get("/:id", getTestimonial);
router.post("/", createTestimonial);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;

/**
 * @openapi
 * /testimonials:
 *  get:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Testimonios
 *     description: Obtiene todos los testimonios registrados en la organización
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *        type: integer
 *       description: Páginado. Cada página contine 10 registros de testimonios
 *     responses:
 *       200:
 *         description: Testimonios obtenidos satisfactoriamente
 *       404:
 *         description: No se encontró ningún registro
 *       500:
 *         description: Error en la respuesta del servidor
 */

/**
 * @openapi
 * /testimonials/{id}:
 *  get:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Testimonios
 *     description: Obtiene un testimonio identificandolo a traves de su "id"
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       description: Identificación del testimonio
 *       required: true
 *     responses:
 *       200:
 *         description: Testimonio obtenido satisfactoriamente
 *       404:
 *         description: No se existe ningún registro con esa identificación
 *       500:
 *         description: Error en la respuesta del servidor
 */

/**
 * @openapi
 * /testimonials:
 *  post:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Testimonios
 *     description: Crea un nuevo testimonio
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                required:
 *                  - name
 *                  - image
 *                  - content
 *                properties:
 *                  name:
 *                    type: string
 *                  image:
 *                    type: string
 *                  content:
 *                    type: string
 *     responses:
 *       201:
 *         description: Testimonio creado satisfactoriamente
 *       400:
 *         description: Solicitud incorrecta. La información entregada por el usuario no cumple con los criterios de la solicitud
 *       500:
 *         description: Error en la respuesta del servidor
 */

/**
 * @openapi
 * /testimonials/{id}:
 *  put:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Testimonios
 *     description: Actualiza un testimonio identificandolo a traves de su "id"
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       description: Identificación del testimonio
 *       required: true
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  image:
 *                    type: string
 *                  content:
 *                    type: string
 *     responses:
 *       204:
 *         description: Testimonio actualizado satisfactoriamente
 *       404:
 *         description: No se existe ningún registro con esa identificación
 *       500:
 *         description: Error en la respuesta del servidor
 */

/**
 * @openapi
 * /testimonials/{id}:
 *  delete:
 *     servers:
 *     - url: http://localhost:3000
 *     tags:
 *     - Testimonios
 *     description: Elimina un testimonio identificandolo a traves de su "id"
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       description: Identificación del testimonio
 *       required: true
 *     responses:
 *       204:
 *         description: Testimonio eliminado satisfactoriamente
 *       404:
 *         description: No se existe ningún registro con esa identificación
 *       500:
 *         description: Error en la respuesta del servidor
 */
