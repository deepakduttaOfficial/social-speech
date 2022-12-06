const User = require("../models/user");
const { validationResult } = require("express-validator");
const { generateFromEmail } = require("unique-username-generator");
const { mailHelper } = require("../config/mailHelper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const os = require("os");

exports.signup = async (req, res) => {
  try {
    // Express validator error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    // Extract all data
    const { name, email, password } = req.body;

    // all fields are requied**
    if (!(name && email && password))
      return res.status(404).json({ error: "All field are requied" });

    // Check user is already resgister or not
    const user = await User.findOne({ email });
    if (user) return res.status(403).json({ error: "User already exist" });

    const data = {
      name,
      email,
      password,
      username: generateFromEmail(email, 4),
    };
    const newUser = await User.create(data);
    if (!newUser)
      return res.status(500).json({ error: "Something went wrong" });

    // Generate email verification token [expire in 10 minute] send the token by useing nodemailer
    const verifyToken = jwt.sign(
      {
        _id: newUser._id,
        // formate: Date.now() / 1000=current sec. and 10 is a minute
        // e.g: it will substract current time and after 2 min time, that's means the actual time is 10min
        exp: Math.floor(Date.now() / 1000) + 60 * 10,
      },
      process.env.EMAIL_VERIFY_TOKEN_SECRET_KEY
    );
    const option = {
      email,
      name,
      verifyToken,
    };
    await mailHelper(req, res, option);

    return res.status(201).json({
      message: `Hello ${name} Account created successfully, Plz check your email and verify to continue..`,
    });
  } catch (error) {
    for (const key in error.errors) {
      return res.status(500).json({ error: error.errors[key].message });
    }
  }
};

exports.signin = async (req, res) => {
  const { userId, password } = req.body;
  console.log("hi");
  try {
    // Field error handeler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    // User can also login with email and username
    const user = await User.findOne({
      $or: [{ email: userId }, { username: userId }],
    });

    // Check user exist or not and Password check
    if (!(user && (await bcrypt.compare(password, user.password))))
      return res
        .status(401)
        .json({ error: "Email and password are not match" });

    const { _id, name, username, email, isVerified, role } = user;

    // Check user verified or not
    if (!isVerified)
      return res
        .status(401)
        .json({ error: "Varify your email to continue..." });

    const token = jwt.sign(
      {
        _id,
        // Token valid time is 24 hours
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      process.env.COOKIEE_SIGNIN_TOKEN
    );

    res.cookie("sign_in_user", token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    // const data = {
    //   $inc: { loginCount: 1 },
    //   $push: {
    //     loginActivity: {
    //       hostname: os.hostname(),
    //       user_name: os.userInfo()?.username,
    //       divice_version: os.version(),
    //       time: new Date().toLocaleString(),
    //     },
    //   },
    // };

    // await User.findByIdAndUpdate(_id, data, { new: true });

    return res
      .status(200)
      .json({ _id, name, username, email, isVerified, role });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went worng" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("sign_in_user");
    return res.status(200).json({ success: "Signout successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Something went worng" });
  }
};
