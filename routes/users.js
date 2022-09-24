const express = require("express");
<<<<<<< HEAD
=======
const { isAdmin, isAuthenticated, getUserId } = require("../middlewares");
>>>>>>> aea812a06c1b0d888643c6c7d30673c8d16cc5e4

const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

<<<<<<< HEAD
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
=======
router.get("/", isAuthenticated, isAdmin, getUsers);
router.get("/:id", isAuthenticated, getUser);
router.post("/", isAuthenticated, createUser);
router.put("/:id", isAuthenticated, isOwnerOrAdmin, updateUser);
router.delete("/:id", isAuthenticated, isOwnerOrAdmin, deleteUser);
>>>>>>> aea812a06c1b0d888643c6c7d30673c8d16cc5e4

module.exports = router;
