const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const useCtrl = require("../controllers/user");
const profilCtrl = require("../controllers/profil");
const multer = require("../middleware/multer-config");
const uploadAvatarCtrl = require("../controllers/avatar");
const usersFormationCtrl = require("../controllers/userFormation");

//Routes de connexion et de déconnexion
router.post("/signup", auth, useCtrl.signup);
router.post("/login", useCtrl.login);
router.post("/logout", useCtrl.logoutUser);
router.get("/jwt", auth, useCtrl.getToken);
router.post("/reset-password", useCtrl.resetPassword); // reset password
router.post("/new-password", useCtrl.newPassword); // reset password

//Route profil utilisateurs
router.get("/", auth, profilCtrl.getAllUsers);
router.get("/:id", auth, profilCtrl.userInfo);
router.post("/:id", auth, multer, profilCtrl.updateUser);
router.delete("/:id", auth, multer, profilCtrl.deleteUser);

// Upload avatar
router.put("/avatar/:id", multer, uploadAvatarCtrl.uploadProfil);

//Formations utilis
router.get("/formation/:id", auth, usersFormationCtrl.getUserFormation);
router.get("/formation/stats/all", auth, usersFormationCtrl.getAllUsersFormation);

module.exports = router;
