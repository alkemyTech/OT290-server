let express = require('express');
let router = express.Router();
let controllers= require('../controllers/memebers')




router.get('/', controllers.getMembers);
router.get('/:id', controllers.getMember);
router.post('/', controllers.createMember);
router.put('/:id', controllers.updateMember);
router.delete('/:id', controllers.deletemember);

module.exports = router;