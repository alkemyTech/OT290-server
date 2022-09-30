"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Organizations", "facebook", Sequelize.STRING);
    await queryInterface.addColumn("Organizations", "linkedin", Sequelize.STRING);
    await queryInterface.addColumn("Organizations", "instagram", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
