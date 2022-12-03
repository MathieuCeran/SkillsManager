const express = require("express");
const db = require("./database");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
const commentRoutes = require("./routes/comment.routes");
const formationRoutes = require("./routes/formation.routes");

const app = express();

//Test connexion
db.sequelize
  .authenticate()
  .then(() => console.log("Connexion a la DB ok ..."))
  .catch((err) => console.log("Connexion refusée", err));

//Helmet correction faille XSS
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json());

// Autorisation entetes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// configuration pour les requêtes axios
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

//Routes Users
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);

//Routes messages
app.use("/api/message", messageRoutes);

//Routes commentaires
app.use("/api/message/comment", commentRoutes);

//Routes Formations
app.use("/api/formation", formationRoutes);

module.exports = app;
