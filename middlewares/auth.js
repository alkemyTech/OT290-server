const { signToken, verifyToken } = require("../helpers/auth");

const  isAuthenticated = async (req, res, next) => {
    try {
        //Verify authetication
        verifyToken(req, res, next);
        next()
    } catch (error) {
        return res.status(403).json(error);
    }
};

const  isOwnerOrAdmin = async (req, res, next) => {
    try {
        const taskId = req.params;
        const tokenHeader = req.headers["Authorization"];
        const token = tokenHeader.substring("Bearer ".length);
        var decoded = jwt.verify(token, JWT_SECRET);
        let id=decoded.id;
        const user = await userService.findById(id);
        const userId = user.id;
        const userRole = user.roleId;
        if (userRole == 1 || userId == taskId) {
            next();
        } else {
            return res.status(401).send("User is not authorized as they are neither an admin or the creator");
        }                       
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { isAuthenticated, isOwnerOrAdmin };