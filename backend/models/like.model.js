const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Likes = sequelize.define(
    "Likes",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      like: {
        type: Sequelize.INTEGER,
      },
    },
    { tableName: "Likes", timestamps: true, underscored: true }
  );

  return Likes;
};

