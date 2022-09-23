const { Comment , User } = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

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

const getCommentsbyUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const comments = await Comment.findAll({
        where: { userId }
      });
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

const createComment = async (req, res) => {
    try {
        const { body, postId } = req.body;
        const tokenHeader = req.headers["Authorization"];
        const token = tokenHeader.substring("Bearer ".length);
        var decoded = jwt.verify(token, JWT_SECRET);
        let id=decoded.id;
        const user = await User.findById(id);
        const userId = user.id;
        const comment = await Comment.create({ userId, body, postId });
        comment.save();
        return res.status(201).json(comment);
      } catch (error) {
        return res.status(500).json(error);
      }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.sendStatus(404);
    }

    const update = await Comment.update(
      { body },
      {
        where: {
          id,
        },
      }
    );
    const commentUpdated = await Comment.findByPk(id);
    return res.status(200).json(commentUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.sendStatus(404);
    }
    await Comment.destroy({
      where: {
        id,
      },
    });
    const commentDeleted = await Comment.findByPk(id, {
      paranoid: false,
    });
    return res.status(200).json(commentDeleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getComments,
  getComment,
  getCommentsbyUser,
  createComment,
  updateComment,
  deleteComment,
};
