const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

exports.updateProfile = async (req, res) => {
  try {
    // Extract all data
    const { username, name } = req.body;
    const newData = { name, username };
    const file = req?.files?.photo;

    // Check info is correct or not
    if (username?.length <= 7)
      return res.status(400).json({ error: `Username must be 7 char.` });

    if (name?.length <= 3)
      return res.status(400).json({ error: `Enter valid name` });

    if (file?.size >= 1024 * 1024 * 3) {
      return res.status(400).json({ error: `File size must be under 3 MB` });
    }

    if (username) {
      const existUsername = await User.findOne({ username });
      if (existUsername)
        return res.status(400).json({ error: `${username} already taken` });
    }
    // ----------------------//

    // If user want update profile pic
    if (file) {
      const image = req.profile.photo;
      if (image?.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      const uploadCloud = await cloudinary.uploader.upload(file?.tempFilePath, {
        folder: "privacyapp/profile_photo",
        crop: "fit",
      });
      newData.photo = {
        public_id: uploadCloud.public_id,
        secure_url: uploadCloud.secure_url,
      };
    }

    // Update user info
    const updateUser = await User.findOneAndUpdate(req.profile._id, newData, {
      new: true,
    });

    if (!updateUser)
      return res.status(500).json({ error: "Something went wrong" });

    return res.status(201).json({
      message: `Hello ${req.profile.name} your profile updated successfully..`,
    });
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};
