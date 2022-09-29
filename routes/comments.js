const express = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { getUserId } = require("../middlewares/getUserId");
const { body } = require("express-validator");

const router = express.Router();

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

router.get("/", isAuthenticated, isAdmin, getComments);
router.get("/:id",
                  body("news_id").notEmpty(),
                  body("user_id").notEmpty(),
                  body("body").notEmpty()
,isAuthenticated, getComment);
router.post("/", isAuthenticated, getUserId, createComment);
router.put("/:id", isAuthenticated, getUserId, updateComment);
router.delete("/:id", isAuthenticated, deleteComment);

module.exports = router;