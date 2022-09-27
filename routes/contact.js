let express = require('express');
let router = express.Router();
let controllers= require('../controllers/contact')
let {isAuthenticated}= require('../middlewares')



router.get('/',isAuthenticated, controllers.getContacts);


module.exports = router;