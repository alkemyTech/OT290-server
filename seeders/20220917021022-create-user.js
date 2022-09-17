"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [];
    for (let i = 0; i < 10; i++) {
      const [roleName, roleId] = i < 5 ? ["standard", 2] : ["admin", 1];
      const user = {
        firstName: `${roleName}User${i}`,
        lastName: "Demo",
        email: `${roleName}User${i}@test.com`,
        // Important: Password not encrypted yet!
        password: `testPassword${i}`,
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
