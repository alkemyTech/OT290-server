const { News } = require('../models');
const { validationResult } = require("express-validator");
const getAllNews = async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get('host') +"/news";
    let { page } = req.query;
    const limit = 10;

    (page) ? page=parseInt(page) : page = 1;
    const offset = 10*(page - 1)
  
    const news = await News.findAll({
      offset, limit,
    });
    const count = await News.count();

    let next = null;
    if(count>offset+limit){
       next = url+"?page="+(parseInt(page)+1);
    }
    
    let previous = null;
    if(offset!=0){
      previous = url+"?page="+(parseInt(page)-1);
   }
   
    const response = {
      data:news,
      next,
      previous
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error)
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
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
