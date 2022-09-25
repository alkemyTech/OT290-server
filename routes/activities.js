const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");
const { getUserId } = require("../middlewares/getUserId");
const { createActivity, updateActivity } = require("../controllers/activities");
const { body } = require("express-validator");

const router = express.Router();

// router.get("/", getActivities);
router.post(
  "/",
  body("name").notEmpty(),
  body("content").notEmpty(),
  isAuthenticated,
  isAdmin,
  createActivity
);

router.put("/:id", isAuthenticated, isAdmin, updateActivity);

// router.get("/:id", isAuthenticated, getComment);
// router.post("/", isAuthenticated, createComment);
// router.put("/:id", isAuthenticated, getUserId, updateComment);
// router.delete("/:id", isAuthenticated, deleteComment);

module.exports = router;
