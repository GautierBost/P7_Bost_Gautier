const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const publicationCtrl = require("../controllers/publications");

//route affichage de toutes les publications
router.get("/", auth, publicationCtrl.getAllPublications);

//route affichage de toutes les publications d'un utilisateur
router.get(
  "/user/:userId/publications",
  auth,
  publicationCtrl.getMyPublications
);

//route création d'une publication
router.post("/", auth, multer, publicationCtrl.createPublication);

//route affichage d'une seule publication
router.get("/:id", auth, publicationCtrl.getOnePublication);

//route modification d'une publication
router.patch("/:id", auth, multer, publicationCtrl.modifyPublication);

//route suppression d'une publication
router.delete("/:id", auth, publicationCtrl.deletePublication);

//route like
router.post("/:id/like", auth, publicationCtrl.likePublication);

module.exports = router;
