const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const getUserId = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader.substring("Bearer ".length);
    var decoded = jwt.verify(token, JWT_SECRET);
    req.params.userId = decoded.data.id;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getUserId };