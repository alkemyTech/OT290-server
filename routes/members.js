var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const { isAdmin } = require("../middlewares/isAdmin");

const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/members");

router.get("/", isAdmin, getMembers);
router.get("/:id", getMember);
router.post("/", body("name").notEmpty().isString(), isAdmin, createMember);
router.put("/:id", updateMember);
router.delete("/:id", isAdmin, deleteMember);

module.exports = router;
