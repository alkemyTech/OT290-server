"use strict";
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [];
    for (let i = 0; i < 10; i++) {
      const [roleName, roleId] = i < 5 ? ["standard", 2] : ["admin", 1];
      // Nano: Create salt and make hash to encrypt passwords
      const salt = await bcrypt.genSalt();
      const encryptedPassword = await bcrypt.hash(`##StrongPassword0${i}`, salt);
      const user = {
        firstName: `${roleName}User${i}`,
        lastName: "Demo",
        email: `${roleName}User${i}@test.com`,
        // Important: Password not encrypted yet!
        password: encryptedPassword,
        roleId: roleId,
        photo:
          "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
