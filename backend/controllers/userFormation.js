const db = require("../database");
const UserModel = db.User;
const Formation = db.Formation;
const UsersFormationModel = db.UserFormation;

exports.getUserFormation = async (req, res, next) => {
  UsersFormationModel.findAll({
    where: { userId: req.params.id },
    include: [
      {
        model: Formation,
        attributes: [
          "formationName",
          "formationLvl",
          "formationPercent",
          "createdAt",
        ],
      },
    ],
  })
    .then((formation) => {
      res.status(200).send(formation);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllUsersFormation = async (req, res, next) => {
  UsersFormationModel.findAll({
    include: [
      {
        model: Formation,
        attributes: [
          "formationName",
          "formationLvl",
          "formationPercent",
          "formationDate",
          "formationFormateur",
        ],
      },
      {
        model: UserModel,
        attributes: ["firstname", "name", "service", "id", "name"],
      },
    ],
  })
    .then((formation) => {
      res.status(200).send(formation);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.creatUserFormation = async (req, res, next) => {
  const theFormation = {
    userId: req.params.id,
    formationId: req.body.formationId,
    formationPercent: req.body.formationPercent,
    formationDate: req.body.formationDate,
    formationFormateur: req.body.formationFormateur,
  };
  UsersFormationModel.create(theFormation)
    .then(() => res.status(201).json({ message: "la formation est assigné !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUserFormation = async (req, res, next) => {
  const formation = await UsersFormationModel.findByPk(req.params.id);

  UserModel.findOne({ where: { id: req.token.userId } }).then((users) => {
    if (!formation)
      return res
        .status(404)
        .send({ message: "La formation n'a pas été trouvé ou déjà supprimé" });

    UsersFormationModel.findOne({ where: { id: req.params.id } }).then(() => {
      if (users.isAdmin === true) {
        UsersFormationModel.destroy({ where: { id: req.params.id } })
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
