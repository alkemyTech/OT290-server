"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Organizations",
      [
        {
          name: "Somos Mas",
          image: "",
          address: "Av. Siempreviva 743",
          phone: "1160112988",
          email: "somosfundacionmas@gmail.com",
          instagram: "SomosMas",
          facebook: "SomosMas",
          linkedin: "SomosMas",
          welcomeText: "Bienvenido a la fundacion Somos Mas",
          aboutUsText:
            "Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás, abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de inserción social",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Organizations", null, {});
  },
};
