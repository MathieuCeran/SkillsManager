const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      firstname: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: "email" },
      service: { type: Sequelize.STRING(255), allowNull: false },
      media: {
        type: Sequelize.STRING(255),
        defaultValue: "/images/defaut/imagedefaut.png",
      },
      password: { type: Sequelize.STRING(255), allowNull: false },
      isAdmin: { type: Sequelize.BOOLEAN, defaultValue: false },
      isCoach: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
      coach: { type: Sequelize.STRING(255), allowNull: true },
    },
    { tableName: "users", timestamps: true, underscored: true }
  );

  return User;
};

