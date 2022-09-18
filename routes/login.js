let express = require('express');
let router = express.Router();
let controllers= require('../controllers/login')
const { body, validationResult } = require('express-validator');

router.post('/',
    
  // username must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
 controllers.getAuth
);



module.exports = router;