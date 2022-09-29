var express = require('express');
var router = express.Router();

const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
} = require('../controllers/members');

router.get('/', getMembers);
router.get('/:id', getMember);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
