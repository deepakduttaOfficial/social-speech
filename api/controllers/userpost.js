const { validationResult } = require("express-validator");
const Category = require("../models/category");
const User = require("../models/user");
const Userpost = require("../models/userpost");

const cloudinary = require("cloudinary").v2;

// Create User post
exports.createUserpost = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract data
    const { title, description, category, isPublic } = req.body;
    if (description?.length < 5)
      return res.status(400).json({ error: `Title must be 5 char. long` });
    const user = req.profile;
    const data = { title, description, category, user: user._id, isPublic };
    const file = req?.files?.postPhoto;

    if (file?.size >= 1024 * 1024 * 4) {
      return res.status(400).json({ error: `File size must be under 4 MB` });
    }

    if (file) {
      const uploadCloud = await cloudinary.uploader.upload(file?.tempFilePath, {
        folder: "privacyapp/user_post",
        crop: "fit",
      });

      data.postPhoto = {
        public_id: uploadCloud.public_id,
        secure_url: uploadCloud.secure_url,
      };
    }

    // Create a post
    const userPost = await Userpost.create(data);
    if (!userPost)
      return res.status(400).json({ error: `Something went worng` });

    await User.findByIdAndUpdate(
      req.profile._id,
      {
        $push: { userPosts: userPost._id },
      },
      { new: true }
    );
    await Category.findByIdAndUpdate(
      category,
      {
        $push: { userPosts: userPost._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: `Successfully created your post`,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Update User post
exports.updateUserpost = async (req, res) => {
  try {
    const getUserPost = req.userPost;
    // Extract data
    const { title, description, category, isPublic } = req.body;
    const file = req?.files?.postPhoto;

    // Add some conditoin
    if (!(title || description || category || isPublic || file))
      return res.status(200).json({ message: `All fieldes are upto date` });
    if (title?.length < 3)
      return res.status(400).json({ error: `Title must be 3 char. long` });
    if (description?.length < 5)
      return res
        .status(400)
        .json({ error: `Description must be 5 char. long` });
    //------------------//

    const data = { title, description, category, isPublic };

    // Handle image and set file size
    if (file?.size >= 1024 * 1024 * 4) {
      return res.status(400).json({ error: `File size must be under 4 MB` });
    }
    if (file) {
      const image = req.userPost.postPhoto;
      if (image?.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      const uploadCloud = await cloudinary.uploader.upload(file?.tempFilePath, {
        folder: "privacyapp/user_post",
        crop: "fit",
      });

      data.postPhoto = {
        public_id: uploadCloud.public_id,
        secure_url: uploadCloud.secure_url,
      };
    }
    //-----------------//

    // Update a post
    const userPost = await Userpost.findByIdAndUpdate(getUserPost._id, data, {
      new: true,
    });
    if (!userPost)
      return res.status(400).json({ error: `Something went worng` });

    // Update category if user chance category
    const isCategorySame = getUserPost.category.equals(category);
    if (!isCategorySame) {
      await Category.findByIdAndUpdate(
        category,
        {
          $push: { userPosts: userPost._id },
        },
        { new: true }
      );

      await Category.findByIdAndUpdate(getUserPost.category, {
        $pull: { userPosts: userPost._id },
      });
    }

    return res.status(201).json({
      success: true,
      message: `Successfully updated your post`,
      userPost,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

// Remove user post
exports.removeUserPost = async (req, res) => {
  try {
    const userPost = req.userPost;
    const profile = req.profile;
    // Profile update
    await User.findByIdAndUpdate(profile._id, {
      $pull: { userPosts: userPost._id },
    });
    // Category update
    await Category.findByIdAndUpdate(userPost.category, {
      $pull: { userPosts: userPost._id },
    });
    // Cloudiny image destory
    const image = userPost?.postPhoto;
    if (image?.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }
    // Remove user post
    await userPost.remove();

    return res
      .status(400)
      .json({ seccess: true, message: "Remove your post successfully" });
  } catch (error) {
    return res.status(400).json({ error: `Something went worng` });
  }
};

//
// Get user post by couple of quary
//

exports.getOnePost = (req, res) => {
  const userPost = req.userPost;
  return res.status(200).json({ seccess: true, userPost });
};

exports.getAllPost = async (req, res) => {
  try {
    const { page_limit, oldest, category } = req.query;
    const query = category ? { category } : {};
    const posts = await Userpost.find(query)
      .where({ isPublic: true })
      .sort({ createdAt: oldest || -1 })
      .limit(page_limit)
      .populate("user", "name username photo")
      .populate("category", "name");

    return res.status(200).json({ seccess: true, posts });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// : `Something went worng ${error}`
