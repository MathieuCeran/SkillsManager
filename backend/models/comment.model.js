const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      commentaire: { type: Sequelize.TEXT, allowNull: false },
      author: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { tableName: "Commentaires", timestamps: true, underscored: true }
  );

  return Comment;
};
