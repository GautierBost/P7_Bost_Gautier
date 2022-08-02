const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretToken = process.env.SECRET_TOKEN;
module.exports = (req, res, next) => {
  try {
    //recuperer le token
    const token = req.headers.authorization.split(" ")[1];
    //decoder et verrifier le token
    const decodedToken = jwt.verify(token, `${secretToken}`);
    //recuperer l'userId associe au token
    const userId = decodedToken.userId;
    //ajout dans la requete d'un objet auth contenant l'userId associe au token
    req.auth = { userId };

    //comparer l'userId de la requete avec celui du token
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID invalide!";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide!"),
    });
  }
};
