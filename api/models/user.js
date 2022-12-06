const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
// const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name must be required"],
    },

    username: {
      type: String,
      unique: [true, "User name must be unique"],
      trim: true,
    },

    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      unique: [true, "Email must be unique"],
      required: [true, "User email is required"],
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Passowrd must be required"],
    },

    role: {
      type: String,
      default: "user",
    },

    isVerified: {
      default: false,
      type: Boolean,
    },

    photo: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    userPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Userpost",
      },
    ],

    forgotPassword: {
      type: String,
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    loginActivity: [
      {
        hostname: String,
        user_name: String,
        divice_version: String,
        time: String,
        loginMedium: {
          type: String,
          default: "Email",
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
