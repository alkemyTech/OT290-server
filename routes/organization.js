let express = require("express");
let router = express.Router();
const { body } = require("express-validator");

let controllers = require("../controllers/organizations");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/public", controllers.getOrganization);
router.post(
  "/public",
  body("name").isString(),
  body("image").isString(),
  body("address").isString(),
  body("phone").isMobilePhone(),
  body("email").isEmail(),
  body("welcomeText").isString(),
  body("aboutUsText").isString(),
  isAuthenticated,
  isAdmin,
  controllers.updateOrganization
);

module.exports = router;
