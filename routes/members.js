var express = require('express');
var router = express.Router();
const { body } = require("express-validator");
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
} = require('../controllers/members');

router.get('/', getMembers);
router.get('/:id', getMember);
router.post('/', 
  body("name").notEmpty().isString()
  ,createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
