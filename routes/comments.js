const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");
const { getUserId } = require("../middlewares/getUserId");

const router = express.Router();

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/users");

// router.get("/", isAuthenticated, isAdmin, getComments);
// router.get("/:id", isAuthenticated, getComment);
// router.post("/", isAuthenticated, createComment);
// router.put("/:id", isAuthenticated, getUserId, updateComment);
// router.delete("/:id", isAuthenticated, deleteComment);

module.exports = router;
