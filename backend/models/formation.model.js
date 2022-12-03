
const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Formation = sequelize.define(
    "Formation",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      formationName: { type: Sequelize.TEXT, allowNull: false },
      formationLvl: { type: Sequelize.TEXT, allowNull: false },
      formationPercent: { type: Sequelize.TEXT, allowNull: true },
      formationDate: { type: Sequelize.TEXT, allowNull: true },
      formationFormateur: { type: Sequelize.TEXT, allowNull: true },

    },
    { tableName: "Formation", timestamps: true, underscored: true }
  );

  return Formation;
};

