const Publication = require("../models/publication");
const User = require("../models/user");
const fs = require("fs");

//creation d'une publication
exports.createPublication = (req, res, next) => {
  const publicationObject = JSON.parse(req.body.publication);
  delete publicationObject._id;
  let publication;
  if (!req.file) {
    publication = new Publication({
      ...publicationObject,
      creationDate: Date.now(),
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    });
  } else {
    publication = new Publication({
      ...publicationObject,
      creationDate: Date.now(),
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
  }
  publication
    .save()
    .then((element) => {
      res.status(201).json(element);
    })
    .catch((error) => {
      console.log("🚀 ~ file: publications.js ~ line 35 ~ error", error);

      res.status(400).json({
        error: error,
      });
    });
};

//affichage d'une publication
exports.getOnePublication = (req, res, next) => {
  Publication.findOne({
    _id: req.params.id,
  })
    .then((publication) => {
      User.findOne({ _id: publication.userId }).then((user) => {
        const completePublication = {
          ...publication.toObject(),
          userName: user.name,
          userProfilePicture: user.profilePicture,
        };
        res.status(200).json(completePublication);
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//affichage de toutes les publications
exports.getAllPublications = async (req, res, next) => {
  try {
    const publications = await Publication.find();

    const promises = publications.map(async (el) => {
      const userInfo = await User.findOne({ _id: el.userId }).then((user) => {
        return { userName: user.name, userProfilePicture: user.profilePicture };
      });
      return {
        ...el.toObject(),
        userName: userInfo.userName,
        userProfilePicture: userInfo.userProfilePicture,
      };
    });
    const resolvedPromises = await Promise.all(promises);
    res.status(200).json(resolvedPromises);
  } catch (error) {
    res.status(400).json(error);
  }
};

//affichage de toutes les publications d'un utilisateur
exports.getMyPublications = async (req, res, next) => {
  try {
    const publications = await Publication.find({ userId: req.params.userId });

    const promises = publications.map(async (el) => {
      const userInfo = await User.findOne({ _id: el.userId }).then((user) => {
        return { userName: user.name, userProfilePicture: user.profilePicture };
      });
      return {
        ...el.toObject(),
        userName: userInfo.userName,
        userProfilePicture: userInfo.userProfilePicture,
      };
    });
    const resolvedPromises = await Promise.all(promises);
    res.status(200).json(resolvedPromises);
  } catch (error) {
    res.status(400).json(error);
  }
};

//modification d'une publication
exports.modifyPublication = (req, res, next) => {
  Publication.findOne({ _id: req.params.id }).then((publication) => {
    //verifier admin et comparer le userId de la publication et du token
    if (!req.admin.isAdmin && publication.userId !== req.auth.userId) {
      return res.status(400).json({
        error: new Error("Requête non authorisée !"),
      });
    }
    //si nouvelle image suppression de l'ancienne
    if (req.file && publication.imageUrl) {
      const filename = publication.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) throw err;
      });
    }
    const publicationObject = req.file
      ? {
          ...JSON.parse(req.body.publication),
          modificationDate: Date.now(),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : {
          ...JSON.parse(req.body.publication),
          modificationDate: Date.now(),
        };
    Publication.updateOne(
      { _id: req.params.id },
      { ...publicationObject, _id: req.params.id }
    )
      .then((coucou) => {
        res.status(201).json(coucou);
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
      //verifier admin et comparer le userId de la publication et du token
      if (!req.admin.isAdmin && publication.userId !== req.auth.userId) {
        return res.status(400).json({
          error: new Error("Requête non authorisée !"),
        });
      }
      //verrifier si la publication contient une image
      if (publication.imageUrl) {
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
      } else {
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
      }
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
