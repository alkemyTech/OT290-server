let express = require('express');
let router = express.Router();
let controllers= require('../controllers/organizations')




router.get('/', controllers.getOrganizations);
router.get('/:id', controllers.getOrganion);
router.post('/', controllers.createOrganion);
router.put('/:id', controllers.updateOrganion);
router.delete('/:id', controllers.deleteOrganion);

module.exports = router;
