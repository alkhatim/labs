const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
module.exports = (req, res, next) => {
  try {
    // the substring(7) is to remove the Bearer keyword needed by passport
    var user = jwt.verify(
      req.header("Authorization").substring(7),
      keys.secretOrKey
    );
    if (user.isAdmin) next();
    else res.status(401).json({ msg: "This user is not authorized" });
  } catch (ex) {
    res.status(400).json({ msg: "Please send a token" });
  }
};
