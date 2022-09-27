const express = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { getUserId } = require("../middlewares/getUserId");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", isAuthenticated, isAdmin, getUsers);
router.get("/:id", isAuthenticated, getUser);
router.post("/", isAuthenticated, createUser);
router.put("/:id", isAuthenticated, getUserId, updateUser);
router.delete("/:id", isAuthenticated, getUserId, deleteUser);

module.exports = router;
