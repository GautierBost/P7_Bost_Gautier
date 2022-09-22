const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const DOMPurify = require("isomorphic-dompurify");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user");

function cleanData(userInput) {
  return DOMPurify.sanitize(userInput);
}

//fonction inscription
exports.signup = (req, res, next) => {
  //hashage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        name: cleanData(req.body.name),
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

// fonction recuperation de l'user
exports.user = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => res.status(404).json({ error }));
};

// fonction modification d'un user
exports.modifyUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId }).then((user) => {
    // si nouvelle image suppression de l'ancienne
    if (req.file) {
      const filename = user.profilePicture.split("/images/")[1];
      if (filename !== "default-picture.jpg") {
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: err });
            return;
          }
        });
      }
    }
    let name = user.name;
    if (req.body.userInfo) {
      const userInfo = JSON.parse(req.body.userInfo);
      name = cleanData(userInfo.name);
    }
    const userObject = req.file
      ? {
          name: name,
          profilePicture: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { name: name };
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: userObject },
      { returnDocument: "after" }
    )
      .then((element) => {
        res.status(201).json(element);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          error: error,
        });
      });
  });
};
