let express = require('express');
let router = express.Router();
let controllers= require('../controllers/contact')
let {isAuthenticated}= require('../middlewares/IsAuthenticated')
const { isAdmin }= require("../middlewares/isAdmin")

router.get('/',isAuthenticated, isAdmin, controllers.getContacts);


<<<<<<< HEAD
// router.get('/',isAuthenticated, controllers.getContacts);

=======
>>>>>>> cdbb8e1c99358f09b274219baec95b9b6283bc28

module.exports = router;