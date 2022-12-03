// const FormationModel = require("../models/formation.model");
// const UserModel = require("../models/user.models");

const db = require("../database");
const UserModel = db.User;
const FormationModel = db.Formation;

exports.createFormation = (req, res, next) => {
  if (!req.body.formationLvl && !req.body.formationLvl)
    return res
      .status(404)
      .send({ message: "Merci de ne pas laisser les champs vides" });
  else {
    FormationModel.create({
      formationName: req.body.formationName,
      formationLvl: req.body.formationLvl,
    })
      .then(() => {
        res.status(200).json({ message: "Formation enregistré" });
      })
      .catch((error) => res.status(501).json({ message: error }));
  }
};

exports.getFormations = async (req, res, next) => {
  FormationModel.findAll({
    attributes: [
      "id",
      "formationName",
      "formationLvl",
      "formationPercent",
      "formationDate",
      "formationFormateur",
      "createdAt",
    ],
  })
    .then((formation) => {
      res.status(200).send(formation);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteFormation = async (req, res, next) => {
  const formation = await FormationModel.findByPk(req.params.id);

  UserModel.findOne({ where: { id: req.token.userId } }).then((users) => {
    if (!formation)
      return res
        .status(404)
        .send({ message: "Laformation n'a pas été trouvé ou déjà supprimé" });

    FormationModel.findOne({ where: { id: req.params.id } }).then(() => {
      if (users.isAdmin === true) {
        FormationModel.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: "La formation est supprimé !" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(500).json({ message: "Vous n'êtes pas autorisé" });
      }
    });
  });
};
