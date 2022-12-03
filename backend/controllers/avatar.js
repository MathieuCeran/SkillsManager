// const UserModel = require("../models/user.models");
const fs = require("fs");

const db = require("../database");
const UserModel = db.User;

exports.uploadProfil = (req, res) => {
  if (req.file != null) {
    UserModel.findOne({ id: req.params.id })
      .then((user) => {
        const filename = user.media.split("/medias/")[1];
        fs.unlink(`images/upload/${filename}`, (err) => {
          UserModel.update(
            {
              media: `${req.protocol}://${req.get("host")}/images/upload/${
                req.file.filename
              }`,
            },
            { where: { id: req.params.id } }
          ).then(() => {
            res.status(200).json({ message: "Profil modifié" });
          });
        });
      })
      .catch((err) => res.status(500).json(err));
  }
};
