/* 'use strict';
// penser à bien ajouter le champ dans schema et model
const { UserSchema, USER_TABLE} = require('./../models/user.model.js');

// @type {import('sequelize-cli').Migration}
module.exports = {
  // pour créer: npm run migrations:migrate ou npx sequelize-cli db:migrate
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'tester', UserSchema.tester)
  },
  // pour éliminer: npm run migrations:revert
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'tester')
  }
};
 */