const express = require("express");
const { isAdmin, isAuthenticated, isOwnerOrAdmin } = require("../middlewares/auth");

const router = express.Router();

const {
  getComments,
  getComment,
  getCommentsByUser,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/users");

router.get("/", isAuthenticated, isAdmin, getComments);
router.get("/:id", isAuthenticated, getComment);
router.get("/:userId", isAuthenticated, isOwnerOrAdmin, getCommentsByUser);
router.post("/", isAuthenticated, createComment);
router.put("/:id", isAuthenticated, updateComment);
router.delete("/:id", isAuthenticated, deleteComment);

module.exports = router;