const { Comment, User } = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { validationResult } = require("express-validator");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(comments);
  }
};

const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.sendStatus(404);
    }
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCommentsFromNews = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({ where: { postId: id } });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { body, postId, userId } = req.body;
    const comment = await Comment.create({ userId, body, postId });
    comment.save();
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateComment = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { body } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.sendStatus(404);
    const owner = await User.findByPk(comment.userId);
    const user = await User.findByPk(userId);
    const role = user.roleId;
    if (owner.id == userId || role == 1) {
      const update = await Comment.update({ body }, { where: { id } });
      const commentUpdated = await Comment.findByPk(id);
      return res.status(200).json(commentUpdated);
    } else {
      return res.status(401).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.sendStatus(404);
    const owner = await User.findByPk(comment.userId);
    const user = await User.findByPk(userId);
    const role = user.roleId;
    if (owner.id == userId || role == 1) {
      await comment.destroy();
      return res.status(200).json(comment);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  getCommentsFromNews,
};
