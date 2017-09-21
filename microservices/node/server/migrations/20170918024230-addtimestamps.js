'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
      return [
        queryInterface.addColumn(
          'Districts',
          'createdAt',
          {
            type: Sequelize.DATE,
            allowNull: true
          }
        ),
        queryInterface.addColumn(
          'Districts',
          'updatedAt',
          {
            type: Sequelize.DATE,
            allowNull: true
          }
        )
      ]
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn(
      'Districts',
      'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: true
      }
    ),
    queryInterface.removeColumn(
      'Districts',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: true
      }
    )
  }
};
