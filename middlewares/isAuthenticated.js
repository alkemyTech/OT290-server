const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const isAuthenticated = (req, res, next) => {
    const tokenHeader = req.headers["Authorization"];
    try {
      if (tokenHeader) {
        const token = tokenHeader.substring("Bearer ".length);
        // parse Bearer Token
        jwt.verify(token, JWT_SECRET);
        // successfully authenticated
        next();
      } else {
        // token does not exists in the request
        res.sendStatus(403);
      }
    } catch (error) {
      // unauthenticated, token expired  
      res.sendStatus(401);
    }
  };
  module.exports = { isAuthenticated };