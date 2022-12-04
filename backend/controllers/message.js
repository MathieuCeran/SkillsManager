// const MessageModel = require("../models/message.model");
// const UserModel = require("../models/user.models");
// const CommentModel = require("../models/comment.model");
// const LikesModel = require("../models/like.model");
const fs = require("fs");

const db = require("../database");
const UserModel = db.User;
const MessageModel = db.Message;
const CommentModel = db.Commentaire;
const LikesModel = db.Likes;

// Création d'un message
exports.createMessage = (req, res, next) => {
  if (!req.body.texte)
    return res
      .status(404)
      .send({ message: "Merci de ne pas laisser les champs vides" });
  else if (req.file != undefined) {
    MessageModel.create(
      {
        userId: req.token.userId,
        texte: req.body.texte,
        author: req.token.userId,
        status: req.body.status,
        media: `${req.protocol}://${req.get("host")}/images/upload/${
          req.file.filename
        }`,
      },
      { where: { id: req.token.userId } }
    )
      .then(() => {
        res.status(200).json({ message: "Message posté" });
      })
      .catch((error) => res.status(501).json({ message: error }));
  } else {
    MessageModel.create(
      {
        userId: req.token.userId,
        texte: req.body.texte,
        author: req.token.userId,
        video: req.body.video,
        status: req.body.status,
      },
      { where: { id: req.token.userId } }
    )
      .then(() => {
        res.status(200).json({ message: "Message posté" });
      })
      .catch((error) => res.status(501).json({ message: error }));
  }
};

//Recupération de tous les messages
exports.getAllMessages = async (req, res, next) => {
  MessageModel.findAll({
    attributes: [
      "id",
      "userId",
      "texte",
      "media",
      "video",
      "createdAt",
      "author",
      "status",
    ],
  })
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((error) => res.status(400).json({ error }));
};

//Recupération d'un seul message
exports.getOneMessage = async (req, res, next) => {
  const message = await MessageModel.findByPk(req.params.id);
  if (!message)
    return res
      .status(404)
      .send({ message: "Le message n'a pas été trouvé ou supprimé" });
  else {
    MessageModel.findOne({
      attributes: [
        "id",
        "userId",
        "texte",
        "media",
        "video",
        "createdAt",
        "author",
        "status",
      ],
      where: { id: req.params.id },
    })
      .then((message) => {
        res.status(200).send(message);
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

//Edition du message
exports.editMessage = async (req, res, next) => {
  const user = req.token.userId;
  const message = await MessageModel.findByPk(req.params.id);

  UserModel.findOne({ where: { id: req.token.userId } }).then((users) => {
    if (!message)
      return res
        .status(404)
        .send({ message: "Le message n'a pas été trouvé ou supprimé" });

    MessageModel.findOne({ where: { id: req.params.id } })
      .then((ThisMessage) => {
        if (
          (ThisMessage.userId === user && req.file != undefined) ||
          (users.isAdmin === true && req.file != undefined)
        ) {
          MessageModel.update(
            {
              texte: req.body.texte,
              media: `${req.protocol}://${req.get("host")}/images/upload/${
                req.file.filename
              }`,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(200).json({ message: "Message modifié" });
            })
            .catch(() => {
              res.status(401).json({ message: "Non Autorisé" });
            });
        } else if (ThisMessage.userId === user || users.isAdmin === true) {
          MessageModel.update(
            {
              texte: req.body.texte,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(200).json({ message: "Message modifié" });
            })
            .catch((error) => res.status(501).json({ message: error }));
        } else if (
          (ThisMessage.userId === user && req.body.texte === undefined) ||
          (users.isAdmin === true && req.body.texte === undefined)
        ) {
          MessageModel.update(
            {
              media: `${req.protocol}://${req.get("host")}/images/upload/${
                req.file.filename
              }`,
            },
            { where: { id: req.params.id } }
          )
            .then(() => {
              res.status(200).json({ message: "Image modifié" });
            })
            .catch((error) => res.status(501).json({ message: error }));
        } else {
          res.status(401).json({ message: "Non Autorisé" });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
};

//Suppression de l'image uniquement
exports.deleteMediaMessage = async (req, res, next) => {
  const message = await MessageModel.findByPk(req.params.id);

  if (!message)
    return res
      .status(404)
      .send({ message: "Le message n'a pas été trouvé ou déjà supprimé" });

  UserModel.findOne({ where: { id: req.token.userId } }).then((users) => {
    if (!users) {
      return res.status(401).json({ message: "pas utilisateur" });
    }
    MessageModel.findOne({ where: { id: req.params.id } }).then(
      (thisMessage) => {
        const filename = thisMessage.media.split("/images/upload/")[1];
        fs.unlink(`images/upload/${filename}`, () => {
          console.log("Image supprimée du dossier");
        });
        MessageModel.update(
          {
            media: null,
          },
          { where: { id: req.params.id } }
        )
          .then(() => {
            res.status(200).json({ message: "Image modifié" });
          })
          .catch((error) => res.status(501).json({ message: error }));
      }
    );
  });
};

//Suppréssion du message
exports.deleteMessage = async (req, res, next) => {
  const user = req.token.userId;
  const message = await MessageModel.findByPk(req.params.id);

  if (!message)
    return res
      .status(404)
      .send({ message: "Le message n'a pas été trouvé ou déjà supprimé" });

  UserModel.findOne({ where: { id: req.token.userId } })
    .then((users) => {
      if (!users) {
        return res.status(401).json({ message: "pas utilisateur" });
      }
      MessageModel.findOne({ where: { id: req.params.id } }).then(
        (thisMessage) => {
          CommentModel.destroy({
            where: { postId: req.params.id },
          });
          console.log("Tous les commentaires de ce message ont été supprimés");
          LikesModel.destroy({
            where: { postId: req.params.id },
          });
          console.log("Tous les commentaires de ce message ont été supprimés");
          if (
            (thisMessage.userId === user && thisMessage.media != null) ||
            (users.isAdmin === true && thisMessage.media != null)
          ) {
            const filename = thisMessage.media.split("/images/upload/")[1];
            fs.unlink(`images/upload/${filename}`, () => {
              message
                .destroy({ where: { id: req.params.id } })
                .then(() => {
                  res.status(200).json({ message: "Message supprimé" });
                })
                .catch((error) => res.status(501).json({ message: error }));
            });
          } else if (thisMessage.userId === user || users.isAdmin === true) {
            message
              .destroy({ where: { id: req.params.id } })
              .then(() => {
                res.status(200).json({ message: "Message supprimé" });
              })
              .catch((error) => res.status(501).json({ message: error }));
          } else {
            res.status(401).json({ message: "Non Autorisé" });
          }
        }
      );
    })

    .catch((error) => {
      res.status(500).json({ error });
    });
};

//Like Message
exports.likeMessage = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.token.userId;
  LikesModel.findAll({ where: { userId, postId } })
    .then(async (likes) => {
      if (likes.length) {
        throw "Post déjà liké 🤚";
      }
      await LikesModel.create({
        userId,
        postId,
      });
      return res.status(201).json({ message: "Post liké ! 👍" });
    })
    .catch((error) => res.status(400).json({ error }));

  //Affichage du total de like en fonction du message
  const count = await LikesModel.count({
    where: { postId: postId },
  });
  console.log(count);
};

exports.unlikeMessage = async (req, res) => {
  const postId = req.params.id;
  const userId = req.token.userId;
  LikesModel.findAll({ where: { userId, postId } })
    .then((likes) => {
      if (!likes.length) {
        throw "Aucun likes a retirer 😥";
      }

      const likesIds = likes.map((like) => like.id);
      console.log(likesIds);
      LikesModel.destroy({ where: { id: likesIds } }).then(() =>
        res.status(201).json({ message: "Like annulé ! 👎" })
      );
    })
    .catch((error) => res.status(400).json({ error }));
};

//Recuperations de tous les likes

exports.totalLike = async (req, res, next) => {
  LikesModel.findAll({
    attributes: ["id", "postId", "userId", "createdAt"],
  })
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((error) => res.status(400).json({ error }));
};
