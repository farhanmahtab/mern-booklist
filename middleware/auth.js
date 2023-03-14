const jwt = require("jsonwebtoken");
const key = require("./jwt_key");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ msg: "Invalid token, authorization denied" });
      
    const decodedToken = jwt.verify(token, key.JWT_KEY);

    req.userData = {
      email: decodedToken.email,
      name: decodedToken.name,
    };
    next();
  } catch (err) {
    return next(new Error("Not able to log in"))
  }
};
