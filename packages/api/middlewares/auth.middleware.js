const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        const user = await userModel
          .findById(decodedToken.id)
          .select("-password");
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      err && console.log("No Token found");
      console.log("Connected User : " + decodedToken.id);
      next();
    });
  } else {
    console.log("No Token found");
  }
};
