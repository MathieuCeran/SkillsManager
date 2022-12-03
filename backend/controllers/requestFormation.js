const db = require("../database");
const RequestFormation = db.RequestFormation;
const Formation = db.Formation;
const UserModel = db.User;

exports.getRequestFormation = async (req, res, next) => {
  RequestFormation.findAll({
    include: [
      {
        model: Formation,
        attributes: ["formationName", "id", "formationLvl"],
      },
      {
        model: UserModel,
        attributes: ["firstname", "id", "name"],
      },
    ],
  })
    .then((formation) => {
      res.status(200).send(formation);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.creatRequestFormation = async (req, res, next) => {
  const requestFormation = {
    usersId: req.body.usersId,
    formationName: req.body.formationName,
    formationDate: req.body.formationDate,
  };
  RequestFormation.create(requestFormation)
    .then(() =>
      res.status(201).json({ message: "La demande de formation est envoyée !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

//asigner une formation depuis une request planifié
exports.creatSubRequestFormation = async (req, res, next) => {
  const requestFormation = {
    formationStatus: req.body.formationStatus,
  };
  RequestFormation.findOne({ where: { id: req.params.id } }).then(
    (ThisSubForma) => {
      if (ThisSubForma) {
        RequestFormation.update(requestFormation, {
          where: {
            id: req.params.id,
          },
        })
          .then(() =>
            res.status(200).json({ message: "Mise à jour de la formation" })
          )
          .catch((error) => {
            console.log(error);
            res.status(400).json({
              message: "Impossible de modifier la formation",
              error,
            });
          });
      } else {
        res.status(500).json({ message: "Vous n'êtes pas autorisé" });
      }
    }
  );
};

exports.editRequestFormation = async (req, res, next) => {
  const formationrequest = {
    formationStatus: req.body.formationStatus,
  };
  RequestFormation.findOne({ where: { id: req.params.id } }).then(
    (ThisForma) => {
      if (ThisForma) {
        RequestFormation.update(formationrequest, {
          where: {
            id: req.params.id,
          },
        })
          .then(() =>
            res.status(200).json({ message: "Mise à jour de la formation" })
          )
          .catch((error) => {
            console.log(error);
            res.status(400).json({
              message: "Impossible de modifier la formation",
              error,
            });
          });
      } else {
        res.status(500).json({ message: "Vous n'êtes pas autorisé" });
      }
    }
  );
};

exports.deleteRequestFormation = async (req, res, next) => {
  RequestFormation.destroy({ where: { id: req.params.id } })
    .then(() =>
      res
        .status(200)
        .json({ message: "La demande de formation est supprimé !" })
    )
    .catch((error) => res.status(400).json({ error }));
};
