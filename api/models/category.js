const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name must be required"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    userPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Userpost",
      },
    ],
  },
  { timestamps: true }
);

const category = mongoose.model("Category", categorySchema);
module.exports = category;
