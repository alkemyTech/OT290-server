const express = require("express");

const router = express.Router();

// Nano: Import express validator to check types of input variables
const { body } = require("express-validator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post(
  "/auth/register",
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  createUser
);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
