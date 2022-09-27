'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [{
      name: 'Test Name',
      facebookUrl: 'https://facebook.com',
      instagramUrl: 'https://instagram.com',
      linkedinUrl: 'https://linkedin.com',
      image: 'https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png',
      description: 'Description text example',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
