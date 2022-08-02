const Publication = require("../models/publication");
const fs = require("fs");

//creation d'une publication
exports.createPublication = (req, res, next) => {
  const publicationObject = JSON.parse(req.body.publication);
  delete publicationObject._id;
  if (!req.file) {
    const publication = new Publication({
      ...publicationObject,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    });
    publication
      .save()
      .then(() => {
        res.status(201).json({
          message: "Publication Créée!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else {
    const publication = new Publication({
      ...publicationObject,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    publication
      .save()
      .then(() => {
        res.status(201).json({
          message: "Publication Créée!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
};

//affichage d'une publication
exports.getOnePublication = (req, res, next) => {
  Publication.findOne({
    _id: req.params.id,
  })
    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//affichage de toutes les publications
exports.getAllPublications = (req, res, next) => {
  Publication.find()
    .then((publications) => {
      res.status(200).json(publications);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//modification d'une publication
exports.modifyPublication = (req, res, next) => {
  Publication.findOne({ _id: req.params.id }).then((publication) => {
    if (!publication) {
      res.status(404).json({
        error: new Error("Publication non trouvée !"),
      });
    }
    //comparer le userId de la publication et du token
    if (publication.userId !== req.auth.userId) {
      res.status(400).json({
        error: new Error("Requête non authorisée !"),
      });
    }
    //si nouvelle image suppression de l'ancienne
    if (req.file) {
      const filename = publication.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) throw err;
      });
    }
    const publicationObject = req.file
      ? {
          ...JSON.parse(req.body.publication),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    Publication.updateOne(
      { _id: req.params.id },
      { ...publicationObject, _id: req.params.id }
    )
      .then(() => {
        res.status(201).json({
          message: "Publication modifiée!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

//suppression d'une publication
exports.deletePublication = (req, res, next) => {
  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      if (!publication) {
        res.status(404).json({
          error: new Error("Publication non trouvée !"),
        });
      }
      //comparer le userId de la publication et du token
      if (publication.userId !== req.auth.userId) {
        res.status(400).json({
          error: new Error("Requête non authorisée !"),
        });
      }
      const filename = publication.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Publication.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({
              message: "Publication Supprimée!",
            });
          })
          .catch((error) => {
            res.status(400).json({
              error: error,
            });
          });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//gestion des likes
exports.likePublication = (req, res, next) => {
  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      //verifier que pas deja de like ou de dislike de l'utilisateur
      if (
        publication.usersLiked.indexOf(req.body.userId) === -1 ||
        publication.usersDisliked.indexOf(req.body.userId) === -1
      ) {
        //like
        if (req.body.like === 1) {
          publication.usersLiked.push(req.body.userId);
          publication.likes += 1;
          //dislike
        } else if (req.body.like === -1) {
          publication.usersDisliked.push(req.body.userId);
          publication.dislikes += 1;
        }
      }
      //anuler un like
      if (
        publication.usersLiked.indexOf(req.body.userId) !== -1 &&
        req.body.like === 0
      ) {
        const userIndex = publication.usersLiked.indexOf(req.body.userId);
        publication.usersLiked.splice(userIndex, 1);
        publication.likes -= 1;
      }
      //annuler un dislike
      if (
        publication.usersDisliked.indexOf(req.body.userId) !== -1 &&
        req.body.like === 0
      ) {
        const userIndex = publication.usersDisliked.indexOf(req.body.userId);
        publication.usersDisliked.splice(userIndex, 1);
        publication.dislikes -= 1;
      }
      publication.save();
      res.status(201).json({ message: "like mis à jour" });
    })
    .catch((error) => res.status(500).json({ error }));
};
