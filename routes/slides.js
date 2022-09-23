var express = require('express');
var router = express.Router();

const {
  getSlides,
  getSlide,
  createSlide,
  updateSlide,
  deleteSlide,
} = require('../controllers/slides');
router.get('/', getSlides)
router.get('/:id', getSlide);
router.post('/', createSlide);
router.put('/:id', updateSlide);
router.delete('/:id', deleteSlide);

module.exports = router;
