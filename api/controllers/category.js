const { validationResult } = require("express-validator");
const Category = require("../models/category");
const User = require("../models/user");

// Create caregory
exports.createCategory = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract data
    const { name } = req.body;

    // Check user is already resgister or not
    const user = req.profile;
    const categoryName = await Category.findOne({ name });
    if (categoryName)
      return res.status(401).json({
        error: `${categoryName.name} is already exist, use different name`,
      });

    const data = {
      name,
      user: user._id,
    };
    const category = await Category.create(data);
    if (!category)
      return res.status(500).json({ error: "Something went wrong" });

    await User.findByIdAndUpdate(
      req.profile._id,
      {
        $push: { categories: category._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: `Category created successfully`,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract data
    const { name } = req.body;
    // Check user is already resgister or not
    const category = req.category;
    const updateCategory = await Category.findByIdAndUpdate(
      category._id,
      { name },
      { new: true }
    );

    if (!updateCategory)
      return res.status(500).json({ error: "Something went wrong" });

    return res.status(201).json({
      success: true,
      message: `Category Updated successfully`,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Get category
exports.getCategory = (req, res) => {
  const category = req.category;
  return res.status(201).json({
    success: true,
    category,
  });
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(201).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
