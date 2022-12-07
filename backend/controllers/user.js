const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user.models");
const db = require("../database");
const UserModel = db.User;
const crypto = require('crypto');
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'skills.manager.local@gmail.com',
    pass: 'ksokrsvwtbbrcfne'
  }
});


exports.signup = async (req, res, next) => {
  const email = await UserModel.findOne({
    where: { email: req.body.email },
  });
  if (email)
    return res
      .status(404)
      .send({ message: "Le mail est déjà utilisé, merci de vous connecter" });
  else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        UserModel.create({
          name: req.body.name,
          firstname: req.body.firstname,
          email: req.body.email,
          service: req.body.service,
          password: hash,
          media: `${req.protocol}://${req.get(
            "host"
          )}/images/defaut/imagedefaut.png`,
          isAdmin: false,
          isActive: false,
        })
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(401).json({ error }));
      })
      .catch((error) => res.status(501).json({ error }));
  }
};

exports.login = (req, res, next) => {
  UserModel.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          const token = jwt.sign({ userId: user.id }, process.env.TOKEN_KEY, {
            expiresIn: "24h",
          });

          return res
            .cookie("jwt", token, { httpOnly: true })
            .status(200)
            .json("Utilisateur connecté");
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Deconnexion
exports.logoutUser = (req, res, next) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

// routes pour récupérer le token et décrypter l'userId et le rôle de l'utilisateur
exports.getToken = (req, res) => {
  const token = req.cookies.jwt;

  // si le token est présent, vérification du token puis décryptage des données
  if (token) {
    try {
      const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
      const userId = decodedToken.userId;
      return res.status(200).json({ userId: userId });
    } catch {
      res.status(403).json({ error: "Token non valide" });
    }
  } else {
    return res.status(403).json({ message: "No token " });
  }
};


//Mot de passe oublie
exports.resetPassword = async (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex")

    UserModel.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) {
          return res.status(422).json({ message: "Aucun utilisateur avec cet email" });
        }
        user.resetToken = token
        user.expireToken = Date.now() + 3600000
        user.save()
          .then((result) => {
            transporter.sendMail({
              to: user.email,
              from: "no-reply-local@gmail.com",
              subject: "Reinitialiser le mot de passe",
              html: `
            <h3>Modifier votre mot de passe - SkillsManager</h3>
            <p>Merci de cliquez sur <a href="http://localhost:3000/forgot/${token}">ce lien</a> pour reinitialiser votre mot de passe</p>
            `
            })
          })
        res.json({ message: "Verifier votre boite mail" })
      })
  })
};