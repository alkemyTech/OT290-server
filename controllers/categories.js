const { validationResult } = require("express-validator");
const { Category } = require("../models");

const getCategories = async (req, res) => {
  try {
    let page = req.query.page ? Number(req.query.page) : 1;
    const limit = 10;
    const URL = `${req.protocol}://${req.get("host")}`;
    const totalCategories = await Category.count();
    if (page > Math.floor(totalCategories / limit + 1))
      return res
        .status(404)
        .json(`Page ${Math.floor(totalCategories / limit + 1)} it the last page`);
    const categories = await Category.findAll({
      attributes: ["id", "name"],
      limit,
      offset: limit * (page - 1),
    });
    const response = {
      nextPage:
        totalCategories > page * limit
          ? `${URL}?page=${page + 1}`
          : "This is the last page",
      data: categories,
      previousPage: page == 1 ? "This is the fist page" : `${URL}?page=${page - 1}`,
    };
    return res.status(200).json(response);
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
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.sendStatus(404);
    }

    const update = await Category.update(
      { name, description, image },
      {
        where: {
          id,
        },
      }
    );
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
    const categoryDeleted = await Category.findByPk(id, {
      paranoid: false,
    });
    return res.status(200).json(categoryDeleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
