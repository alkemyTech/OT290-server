var express = require('express');
var router = express.Router();

const {
  getSlides
} = require('../controllers/slides');

router.get('/:id', getSlides);

module.exports = router;
