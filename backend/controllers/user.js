const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user");

//fonction inscription
exports.signup = (req, res, next) => {
  //hashage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//fonction connexion
const secretToken = process.env.SECRET_TOKEN;
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      //verrification email
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
        //verrification mot de passe
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !" });
            } else {
              //attribution d'un token
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, `${secretToken}`, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// fonction recuperation d'un user
exports.user = (req, res, next) => {
  User.findOne({ token: req.body.token })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => res.status(404).json({ error: error }));
};

// fonction modification d'un user
exports.modifyUser = (req, res, next) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    //comparer le userId du user et du token
    if (user._id !== req.auth.userId) {
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
    const userObject = req.file
      ? {
          ...JSON.parse(req.body.user),
          profilePicture: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    User.updateOne(
      { _id: req.params.id },
      { ...userObject, _id: req.params.id }
    )
      .then(() => {
        res.status(201).json({
          message: "Utilisateur modifiée!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};
