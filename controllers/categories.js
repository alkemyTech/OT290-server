const { validationResult } = require('express-validator');
const { Category } = require('../models');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(
      {  attributes: ['name'], }
    );

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.sendStatus(404);
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const createCategory = async (req, res) => {
  try {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, description, image } = req.body;
    const category = await Category.create({ name, description, image });
    category.save();
    return res.status(201).json(category);
    
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateCategory = async (req, res) => {
  const errors = validationResult(req);
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.sendStatus(404);
    }

    const update = await Category.update({ name, description, image }, {
      where: {
        id,
      },
    });
    const categoryUpdated = await Category.findByPk(id);
    return res.status(200).json(categoryUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.sendStatus(404);
    }
    await Category.destroy({
      where: {
        id,
      },
    });
    const categoryDeleted = await Category.findByPk(
      id,
      {
        paranoid: false,
      },
    );
    return res.status(200).json(categoryDeleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getCategories, getCategory, createCategory, updateCategory, deleteCategory,
};
