const express = require("express");
const { isAdmin, isAuthenticated, getUserId } = require("../middlewares");

const router = express.Router();

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
router.put("/:id", isAuthenticated, isOwnerOrAdmin, updateUser);
router.delete("/:id", isAuthenticated, isOwnerOrAdmin, deleteUser);

module.exports = router;
