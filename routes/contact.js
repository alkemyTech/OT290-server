let express = require('express');
let controllers= require('../controllers/contact');
let {isAuthenticated}= require('../middlewares/isAuthenticated');

let router = express.Router();

router.get('/',isAuthenticated, controllers.getContacts);


module.exports = router;