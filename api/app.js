require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// Version
const version = "v1";

// Import router
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const userpostRouter = require("./routes/userpost");

// Middleware
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes middleware
app.use(`/api/${version}`, authRouter);
app.use(`/api/${version}`, userRouter);
app.use(`/api/${version}`, categoryRouter);
app.use(`/api/${version}`, userpostRouter);

module.exports = app;
