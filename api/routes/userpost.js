const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createUserpost,
  updateUserpost,
  removeUserPost,
  getOnePost,
  getAllPost,
} = require("../controllers/userpost");

// Middleware
const {
  getProfileById,
  isSignin,
  isAuthenticate,
} = require("../middleware/auth");
const { isValidatCatagory } = require("../middleware/category");
const {
  isPostCreatedByUser,
  getUserPostById,
  isPublicPost,
} = require("../middleware/userpost");
router.param("profileId", getProfileById);
router.param("postId", getUserPostById);
//---------------------//

/*****************************************/
router.post(
  "/userpost/create/:profileId",
  isSignin(),
  isAuthenticate,
  body("title", "Title is required").notEmpty(),
  body("title", "Title must be 3 char. long").isLength({
    min: 3,
  }),
  body("category", "Select a category").notEmpty(),
  body("isPublic", "Select your post type").notEmpty(),
  isValidatCatagory,
  createUserpost
);

router.put(
  "/userpost/update/:profileId/:postId",
  isSignin(),
  isAuthenticate,
  isValidatCatagory,
  isPostCreatedByUser,
  updateUserpost
);

router.delete(
  "/userpost/remove/:profileId/:postId",
  isSignin(),
  isAuthenticate,
  isPostCreatedByUser,
  removeUserPost
);

//
// Get user post by couple of quary
//
router.get(
  "/userpost/getone/:profileId/:postId",
  isSignin(),
  isAuthenticate,
  isPublicPost,
  getOnePost
);

router.get("/userpost/getall", isSignin(), getAllPost);

/*****************************************/
module.exports = router;
