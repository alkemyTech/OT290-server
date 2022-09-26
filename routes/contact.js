let express = require("express");
let router = express.Router();
let controllers = require("../controllers/contact");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/", isAuthenticated, isAdmin, controllers.getContacts);

module.exports = router;
