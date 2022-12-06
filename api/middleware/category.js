const Category = require("../models/category");

exports.getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id)
      .populate("user", "name email username")
      .populate("userPosts");
    if (!category) return res.status(400).json({ error: "Category not found" });
    req.category = category;

    next();
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};

exports.isCategoryCreatedByUser = async (req, res, next) => {
  try {
    const { user } = req.category;
    const { _id } = req.profile;
    const isEqual = user.equals(_id);
    if (!isEqual) {
      return res.status(400).json({
        error: "You cann't touch this category",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};

exports.isValidatCatagory = async (req, res, next) => {
  try {
    if (req.body?.category) {
      const category = await Category.findById(req.body.category);
      if (!category)
        return res.status(400).json({ error: "Category not found" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};
