const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  createActivity,
  updateActivity,
  getActivities,
} = require("../controllers/activities");
const { body } = require("express-validator");

const router = express.Router();

router.get("/", getActivities);
router.post(
  "/",
  body("name").notEmpty(),
  body("content").notEmpty(),
  isAuthenticated,
  isAdmin,
  createActivity
);
router.put("/:id", isAuthenticated, isAdmin, updateActivity);

module.exports = router;
