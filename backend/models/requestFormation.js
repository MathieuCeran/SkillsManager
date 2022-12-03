const { Sequelize } = require("sequelize");


module.exports = (sequelize) => {
    const RequestFormation = sequelize.define(
        "requestFormation",
        {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            usersId: { type: Sequelize.INTEGER, allowNull: false },
            formationName: { type: Sequelize.INTEGER, allowNull: true },
            formationDate: { type: Sequelize.TEXT, allowNull: true },
            formationStatus: { type: Sequelize.TEXT, allowNull: true, defaultValue: 0 },
        },
        { tableName: "requestFormation", timestamps: true, underscored: true }
    );

    return RequestFormation;
};

