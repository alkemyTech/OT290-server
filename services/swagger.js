const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Somos-Mas-API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          description: "Sistema de seguridad",
          scheme: "bearer",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000/",
      },
      {
        url: "http://localhost:3059/", // Ejemplo de server opcional
      },
    ],
  },

  apis: [`${path.join(__dirname, "../routes/*.js")}`],
};
module.exports = {
  swaggerJsDoc,
  swaggerUi,
  swaggerSpec,
};
