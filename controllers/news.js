const { News } = require('../models');

const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) {
      return res.sendStatus(404);
    }
    return res.status(200).json(news);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const createNews = async (req, res) => {
  try {
    const {
      name,
      content,
      image,
      categoryId,
    } = req.body;
    const news = await News.create({
      name,
      content,
      image,
      categoryId,
    });
    news.save();
    return res.status(201).json(news);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      content,
      image,
      categoryId,
    } = req.body;

    const news = await News.findByPk(id);
    if (!news) {
      return res.sendStatus(404);
    }

    await News.update({
      name,
      content,
      image,
      categoryId,
    }, {
      where: {
        id,
      },
    });
    const newsUpdated = await News.findByPk(id);
    return res.status(200).json(newsUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) {
      return res.sendStatus(404);
    }
    await News.destroy({
      where: {
        id,
      },
    });
    const newsDeleted = await News.findByPk(
      id,
      {
        paranoid: false,
      },
    );
    return res.status(200).json(newsDeleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllNews, getNews, createNews, updateNews, deleteNews,
};
