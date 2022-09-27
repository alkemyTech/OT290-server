const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const isAdmin = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  try {
    const token = tokenHeader.substring("Bearer ".length);
    const { data } = jwt.verify(token, JWT_SECRET);
    if (data.roleId === 1) {
      next();
      return;
    }
    return res.sendStatus(403);
  } catch (error) {
    return res.status(401).json(error);
  }
};
module.exports = { isAdmin };
