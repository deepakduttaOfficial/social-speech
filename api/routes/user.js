const express = require("express");
const router = express.Router();

// Middleware
const { updateProfile } = require("../controllers/user");
const {
  getProfileById,
  isSignin,
  isAuthenticate,
} = require("../middleware/auth");
router.param("profileId", getProfileById);
//---------------------//

/*****************************************/
router.post(
  "/user/update/:profileId",
  isSignin(),
  isAuthenticate,
  updateProfile
);
/*****************************************/
module.exports = router;
