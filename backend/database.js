const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

//relation
const db = {};

db.sequelize = sequelize;
db.User = require("./models/user.models")(sequelize);
db.Message = require("./models/message.model")(sequelize);
db.Commentaire = require("./models/comment.model")(sequelize);
db.Likes = require("./models/like.model")(sequelize);
db.Formation = require("./models/formation.model")(sequelize);
db.UserFormation = require("./models/userFormation.model")(sequelize);
db.RequestFormation = require("./models/requestFormation")(sequelize);

db.Formation.hasMany(db.UserFormation, {
  foreignKey: "formationId",
  onDelete: "cascade",
});

db.UserFormation.belongsTo(db.Formation, {
  foreignKey: "formationId",
  onDelete: "cascade",
});

db.User.hasMany(db.UserFormation, {
  foreignKey: "userId",
  onDelete: "cascade",
});

db.UserFormation.belongsTo(db.User, {
  foreignKey: "userId",
  onDelete: "cascade",
});

db.User.hasMany(db.RequestFormation, {
  foreignKey: "usersId",
  onDelete: "cascade",
});

db.RequestFormation.belongsTo(db.User, {
  foreignKey: "usersId",
  onDelete: "cascade",
});

db.Formation.hasMany(db.RequestFormation, {
  foreignKey: "formationName",
  onDelete: "cascade",
});

db.RequestFormation.belongsTo(db.Formation, {
  foreignKey: "formationName",
  onDelete: "cascade",
});

//synchronisation

sequelize.sync({ alter: true });

module.exports = db;
