let express = require("express");
let router = express.Router();
let controllers= require('../controllers/contact')
let {isAuthenticated}= require('../middlewares/IsAuthenticated')
const { isAdmin }= require("../middlewares/isAdmin")


router.get('/',isAuthenticated,isAdmin,controllers.getBackContacts);



module.exports = router;