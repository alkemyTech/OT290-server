const express = require('express');
const { body } = require("express-validator");
const router = express.Router();

const {
  getCategories, getCategory, createCategory, updateCategory, deleteCategory,
} = require('../controllers/categories');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/',
  body("name").exists(),
  body("name").notEmpty(),
  body("name").isString(), createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
