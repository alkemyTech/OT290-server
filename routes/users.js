const express = require("express");
const { isAdmin, getUserId, isAuthenticated} = require("../middlewares/");
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
router.put("/:id", isAuthenticated, getUserId, updateUser);
router.delete("/:id", isAuthenticated, getUserId, deleteUser);

module.exports = router;
