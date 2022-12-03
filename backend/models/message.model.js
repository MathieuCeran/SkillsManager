const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Message = sequelize.define(
    "Messages",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
      },
      texte: { type: Sequelize.TEXT, allowNull: false },
      media: { type: Sequelize.STRING, allowNull: true },
      video: { type: Sequelize.STRING, allowNull: true },
      author: { type: Sequelize.INTEGER, allowNull: false },
    },
    { tableName: "messages", timestamps: true, underscored: true }
  );
  return Message;
};
