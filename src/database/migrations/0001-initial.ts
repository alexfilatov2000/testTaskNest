import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Roles',
        {
          id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, primaryKey: true },
          name: { type: dataTypes.STRING },
          createdAt: { type: dataTypes.DATE, allowNull: false },
          updatedAt: { type: dataTypes.DATE, allowNull: false },
          deletedAt: { type: dataTypes.DATE, allowNull: true },
        },
        { transaction }
      );

      await queryInterface.createTable(
        'Users',
        {
          id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, primaryKey: true },
          email: { type: dataTypes.STRING },
          passwordHash: { type: dataTypes.STRING },
          name: { type: dataTypes.STRING },
          roleId: { type: dataTypes.UUID, references: { model: 'Roles', key: 'id' } },

          createdAt: { type: dataTypes.DATE, allowNull: false },
          updatedAt: { type: dataTypes.DATE, allowNull: false },
          deletedAt: { type: dataTypes.DATE, allowNull: true },
        },
        { transaction }
      );
    }),

  down: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('Users', { transaction });
      await queryInterface.dropTable('Roles', { transaction });
    }),
};
