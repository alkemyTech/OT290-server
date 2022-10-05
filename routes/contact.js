let express = require("express");
let router = express.Router();
let controllers = require("../controllers/contact");
let { isAuthenticated } = require("../middlewares/isAuthenticated.js");
const { isAdmin } = require("../middlewares/isAdmin");
const { body } = require("express-validator");

router.get("/:id", isAuthenticated, isAdmin, controllers.getContact);
router.get("/", isAuthenticated, isAdmin, controllers.getContacts);
router.post(
  "/",
  body("name").notEmpty(),
  body("email").notEmpty(),
  isAuthenticated,
  isAdmin,
  controllers.createContact
);
router.put("/:id", isAuthenticated, isAdmin, controllers.updateContact);
router.delete("/:id", isAuthenticated, isAdmin, controllers.deleteContact);

module.exports = router;
