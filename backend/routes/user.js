const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const userCtrl = require("../controllers/user");

//route creation d'un compte utilisateur
router.post("/signup", userCtrl.signup);

//route connexion a un compte utilisateur
router.post("/login", userCtrl.login);

//route recuperation d'un utilisateur
router.get("/user", auth, userCtrl.user);

//route modification d'un utilisateur
router.patch("/:userId", auth, multer, userCtrl.modifyUser);

module.exports = router;
