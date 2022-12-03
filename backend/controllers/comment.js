// const CommentModel = require("../models/comment.model");
// const UserModel = require("../models/user.models");
// const MessageModel = require("../models/message.model");

const db = require("../database");
const UserModel = db.User;
const MessageModel = db.Message;
const CommentModel = db.Commentaire;

// Création d'un comment
exports.createComment = async (req, res, next) => {
  const message = await MessageModel.findOne({
    where: { id: req.params.id },
  }).then((message) => {
    if (!message) {
      return res.status(401).json({ message: "Message introuvable" });
    }
  });
  MessageModel.findOne({
    where: { id: req.params.id },
  }).then((message) => {
    const comment = {
      commentaire: req.body.commentaire,
      userId: req.token.userId,
      postId: req.params.id,
      author: message.userId,
    };
    CommentModel.create(comment)
      .then(() =>
        res.status(201).json({ message: "Le commentaire est posté !" })
      )
      .catch((error) => res.status(400).json({ error }));
  });
};

//Edition d'un commentaire
exports.editComment = async (req, res, next) => {
  const user = req.token.userId;
  const commentaire = await CommentModel.findByPk(req.params.id);

  UserModel.findOne({ where: { id: req.token.userId } }).then((users) => {
    if (!commentaire)
      return res
        .status(404)
        .send({ message: "Le commentaire n'a pas été trouvé ou supprimé" });

    const updateComment = {
      commentaire: req.body.commentaire,
    };
    CommentModel.findOne({ where: { id: req.params.id } }).then(
      (ThisComment) => {
        if (ThisComment.userId === user || users.isAdmin === true) {
          CommentModel.update(updateComment, {
            where: {
              id: req.params.id,
            },
          })
            .then(() =>
              res.status(200).json({ message: "Commentaire modifié" })
            )
            .catch((error) => {
              console.log(error);
              res.status(400).json({
                message: "Impossible de modifier ce commentaire",
                error,
              });
            });
        } else {
          res.status(500).json({ message: "Vous n'êtes pas autorisé" });
        }
      }
    );
  });
};

//Suppréssion du commentaire
exports.deleteComment = async (req, res, next) => {
  const commentaire = await CommentModel.findByPk(req.params.id);
  const user = req.token.userId;

  UserModel.findOne({ where: { id: req.token.userId } }).then((users) => {
    if (!commentaire)
      return res
        .status(404)
        .send({ message: "Le commentaire n'a pas été trouvé ou supprimé" });
    CommentModel.findOne({ where: { id: req.params.id } }).then(
      (thisComment) => {
        if (
          thisComment.userId === user ||
          users.isAdmin === true ||
          user === thisComment.author
        ) {
          CommentModel.findOne({
            where: { id: req.params.id, userId: req.token.userId },
          })
            .then((comment) => {
              CommentModel.destroy({ where: { id: req.params.id } })
                .then(() =>
                  res
                    .status(200)
                    .json({ message: "Le commentaire est supprimé !" })
                )
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({ error });
            });
        } else {
          res.status(500).json({ message: "Vous n'êtes pas autorisé" });
        }
      }
    );
  });
};

//affichage de tous les commentaires

exports.getComments = async (req, res, next) => {
  CommentModel.findAll({
    attributes: [
      "id",
      "userId",
      "postId",
      "commentaire",
      "createdAt",
      "author",
    ],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(500).json(error));
};
