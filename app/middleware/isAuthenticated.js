const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const constanet = require("../constant");
module.exports = function (app) {
  app.use((req, res, next) => {
    if (req.url === "/user/login") {
      return next();
    }
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decode = jwt.verify(token, constanet.JWT_SECRET);
      } catch (err) {
        return res.status(401).send({ message: "Unauthorized", error: err });
      }
    } else {
      return res.status(401).send({ message: "Unauthorized" });
    }
    next();
  });
};
