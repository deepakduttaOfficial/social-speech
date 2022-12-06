const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
} = require("../controllers/category");

// Middleware
const {
  getProfileById,
  isSignin,
  isAuthenticate,
  isAdmin,
} = require("../middleware/auth");
const {
  getCategoryById,
  isCategoryCreatedByUser,
} = require("../middleware/category");
router.param("profileId", getProfileById);
router.param("categoryId", getCategoryById);

//---------------------//

/*****************************************/
router.post(
  "/category/create/:profileId",
  isSignin(),
  isAuthenticate,
  body("name", "name is required").notEmpty(),
  body("name", "name must be at least 2 chars long").isLength({
    min: 2,
  }),
  isAdmin,
  createCategory
);

// Update category
router.put(
  "/category/update/:profileId/:categoryId",
  isSignin(),
  isAuthenticate,
  isCategoryCreatedByUser,
  body("name", "name is required").notEmpty(),
  body("name", "name must be at least 2 chars long").isLength({
    min: 2,
  }),
  isAdmin,
  updateCategory
);

// Get single category
router.get("/category/get/:categoryId", getCategory);

// Get single category
router.get("/categories/get", getCategories);

// Todo:

/*****************************************/

module.exports = router;
