const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const formationCtrl = require("../controllers/formation");
const formationUserCtrl = require("../controllers/userFormation");
const requestFormationCtrl = require("../controllers/requestFormation");

//CRUD Formations
router.post("/", auth, formationCtrl.createFormation);
router.get("/all", auth, formationCtrl.getFormations);
router.delete("/:id", auth, formationCtrl.deleteFormation);
router.post("/formationAssign/:id", auth, formationUserCtrl.creatUserFormation);
router.delete(
  "/formationAssign/:id",
  auth,
  formationUserCtrl.deleteUserFormation
);

//CRUD REQUESTFORMATION
router.post(
  "/requestFormation",
  auth,
  requestFormationCtrl.creatRequestFormation
);
router.get("/requestFormation", auth, requestFormationCtrl.getRequestFormation);
router.put(
  "/requestFormation/:id",
  auth,
  requestFormationCtrl.editRequestFormation
);
router.delete(
  "/requestFormation/:id",
  auth,
  requestFormationCtrl.deleteRequestFormation
);
router.put(
  "/requestFormation/:id",
  auth,
  requestFormationCtrl.creatSubRequestFormation
); //ajouter une formation a un user qui est planifié

module.exports = router;
