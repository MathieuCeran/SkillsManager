const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/message");
const multer = require("../middleware/multer-config");

//Route messages
router.get("/", auth, multer, messageCtrl.getAllMessages);
router.get("/:id", auth, multer, messageCtrl.getOneMessage);

//CRUD Messages
router.post("/", auth, multer, messageCtrl.createMessage);
router.put("/:id", auth, multer, messageCtrl.editMessage);
router.delete("/:id", auth, multer, messageCtrl.deleteMessage);
router.patch("/:id", auth, multer, messageCtrl.deleteMediaMessage);

//Like/Unlike
router.post("/like/:id", auth, messageCtrl.likeMessage);
router.post("/unlike/:id", auth, messageCtrl.unlikeMessage);
// router.get("/like/:id", auth, messageCtrl.postLike);
router.get("/like/all", auth, messageCtrl.totalLike);

module.exports = router;
