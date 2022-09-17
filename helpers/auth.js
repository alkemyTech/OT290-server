const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

// this will be used when a token needs to be verified on a http request inside Controller.
const signToken = (user) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (600 * 600),
  data: user,
}, JWT_SECRET);

// This should be used when a token needs to be verified on a http request.
const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers['x-auth-token'];
  try {
    if (tokenHeader) {
      jwt.verify(tokenHeader, JWT_SECRET);
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

module.exports = { signToken, verifyToken };
