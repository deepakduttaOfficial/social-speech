const Userpost = require("../models/userpost");

exports.getUserPostById = async (req, res, next, id) => {
  try {
    const userPost = await Userpost.findById(id)
      .populate("user", "name username email photo")
      .populate("category", "name");
    if (!userPost) return res.status(400).json({ error: "Post not found" });
    req.userPost = userPost;

    next();
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};

exports.isPostCreatedByUser = async (req, res, next) => {
  try {
    const { user } = req.userPost;
    const { _id } = req.profile;
    const isEqual = user.equals(_id);
    if (!isEqual) {
      return res.status(400).json({
        error: "You cann't touch this Post",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};

exports.isPublicPost = (req, res, next) => {
  const userPost = req.userPost;
  const profile = req.profile;
  const isEqual = userPost.user._id.equals(profile._id);
  if (userPost.isPublic) {
    next();
  } else if (!userPost.isPublic && isEqual) {
    next();
  } else {
    return res
      .status(400)
      .json({ error: "This is private post, You cann't modify and see it" });
  }
};
