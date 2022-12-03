const { Sequelize } = require("sequelize");


module.exports = (sequelize) => {
  const UsersFormation = sequelize.define(
    "usersFormation",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
      },
      formationId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Formation",
          key: "id",
        },
      },
      formationPercent: {
        type: Sequelize.INTEGER,
      },
      formationDate: {
        type: Sequelize.TEXT,
      },
      formationFormateur: {
        type: Sequelize.TEXT,
      },
    },
    { tableName: "usersFormation", timestamps: true, underscored: true }
  );

  return UsersFormation;
};

