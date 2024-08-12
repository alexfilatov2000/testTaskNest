import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, dataTypes: typeof DataTypes) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Posts',
        {
          id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, primaryKey: true },
          title: { type: dataTypes.STRING },
          description: { type: dataTypes.STRING },
          userId: { type: dataTypes.UUID, references: { model: 'Users', key: 'id' }, allowNull: false },

          createdAt: { type: dataTypes.DATE, allowNull: false },
          updatedAt: { type: dataTypes.DATE, allowNull: false },
          deletedAt: { type: dataTypes.DATE, allowNull: true },
        },
        { transaction }
      );
    }),

  down: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('Posts', { transaction });
    }),
};
