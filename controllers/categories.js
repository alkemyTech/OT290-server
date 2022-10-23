const { validationResult } = require("express-validator");
const { Category } = require("../models");
const { uploadFileS3, deleteFileS3 } = require("../services/S3storage");
const { decodeImage, generateImageName } = require("../services/images");

const getCategories = async (req, res) => {
  try {
    let page = req.query.page ? Number(req.query.page) : 1;
    const limit = 10;
    const URL = `${req.protocol}://${req.get("host")}/categories`;
    const totalCategories = await Category.count();
    if (page > Math.floor(totalCategories / limit + 1))
      return res.status(404).json({ nextPage: null, data: [], previousPage: null });
    const categories = await Category.findAll({
      attributes: ["id", "name"],
      limit,
      offset: limit * (page - 1),
    });
    const response = {
      nextPage: totalCategories > page * limit ? `${URL}?page=${page + 1}` : null,
      data: categories,
      previousPage: page == 1 ? null : `${URL}?page=${page - 1}`,
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
    let imageInfo = decodeImage(image);
    let imageTimestamp = Date.now();
    let imageUrl = await uploadFileS3(
      imageInfo.datos,generateImageName('category', imageTimestamp, imageInfo.extension)
    );

    const category = await Category.create({ name, description, image: imageUrl});
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
    };
    await deleteFileS3(category.image);
    let imageInfo = decodeImage(image);
    let imageTimestamp = Date.now();
    let imageUrl = await uploadFileS3(
      imageInfo.datos,generateImageName('slide', imageTimestamp, imageInfo.extension)
    ); 
    const update = await Category.update(
      { name, description, image: imageUrl },
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
    await deleteFileS3(category.image);
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
