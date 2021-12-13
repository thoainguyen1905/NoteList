const express = require("express");
const route = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require('../middleware/auth')

const User = require("../models/User");

route.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      res.status(400).json({ succcess: false, message: "User not found!" });
    res.json({success:true, user})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

route.post("/register", async (req, res) => {
  const { username, password } = req.body;
  //simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "username and/or password fail" });

  try {
    const user = await User.findOne({ username });
    //check user
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already token" });
    }
    //all good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });
    //luu vao DB
    await newUser.save();

    //return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "User creater successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

route.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "username and/or password fail" });
  try {
    const user = await User.findOne({ username });
    //check user
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect username" });
    }
    //check password
    const passwordValid = argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "incorrect password" });
    //return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "User login successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

module.exports = route;
