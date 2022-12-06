const mongoose = require("mongoose");
const { Schema } = mongoose;

const userpostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title must be required"],
    },

    postPhoto: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Choose a category"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPublic: {
      type: Boolean,
      required: [true, "Select your post type"],
    },

    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comment: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const userpost = mongoose.model("Userpost", userpostSchema);
module.exports = userpost;
