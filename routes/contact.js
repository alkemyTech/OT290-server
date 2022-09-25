let express = require('express');
let router = express.Router();
let controllers= require('../controllers/contact')
let {isAuthenticated}= require('../helpers/auth')



// router.get('/',isAuthenticated, controllers.getContacts);


module.exports = router;