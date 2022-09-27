const express = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { getUserId } = require("../middlewares/getUserId");

const router = express.Router();

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

router.get("/", isAuthenticated, isAdmin, getComments);
router.get("/:id", isAuthenticated, getComment);
router.post("/", isAuthenticated, getUserId, createComment);
router.put("/:id", isAuthenticated, getUserId, updateComment);
router.delete("/:id", isAuthenticated, getUserId, deleteComment);

module.exports = router;
