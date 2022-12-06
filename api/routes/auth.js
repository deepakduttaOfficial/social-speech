const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { signup, signin, logout } = require("../controllers/auth");
const { isSignin } = require("../middleware/auth");

/*****************************************/
router.post(
  "/signup",
  body("name", "Name is required").notEmpty(),
  body("email", "Enter valid email").isEmail().normalizeEmail().notEmpty(),
  body("password", "password must be at least 3 chars long").isLength({
    min: 3,
  }),
  signup
);

router.post(
  "/signin",
  body("userId", "Enter your username").notEmpty(),
  body("password", "Enter your password").notEmpty(),
  signin
);

router.get("/logout", isSignin(), logout);

/*****************************************/

module.exports = router;
