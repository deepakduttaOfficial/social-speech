// Implement some middleware
var { expressjwt } = require("express-jwt");
const User = require("../models/user");

exports.getProfileById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });
    user.password = undefined;
    user.loginCount = undefined;
    user.loginActivity = undefined;
    user.password = undefined;
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "User not found" });
  }
};

exports.isSignin = () => {
  return [
    expressjwt({
      secret: process.env.COOKIEE_SIGNIN_TOKEN,
      algorithms: ["HS256"],
      getToken: function (req) {
        if (req.cookies.sign_in_user !== "") {
          return req.cookies.sign_in_user;
        }
        return null;
      },
    }),
    function (err, req, res, next) {
      return res
        .status(err.status)
        .json({ error: "Login your account to countinue..." });
    },
  ];
};

exports.isAuthenticate = async (req, res, next) => {
  try {
    if (req.profile._id != req.auth._id)
      return res.status(401).json({ error: "You are not authencated" });
    next();
  } catch (error) {
    return res.status(401).json({ error: "You're not authenticated" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.profile.role !== "admin")
      return res.status(400).json({ error: "You are not Admin" });
    next();
  } catch (error) {
    return res.status(401).json({ error: "You're not Admin" });
  }
};
