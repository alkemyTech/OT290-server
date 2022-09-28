const express = require('express');

const router = express.Router();

const {
  getAllNews, getNews, createNews, updateNews, deleteNews,
} = require('../controllers/news');

router.get('/', getAllNews);
router.get('/:id', getNews);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
