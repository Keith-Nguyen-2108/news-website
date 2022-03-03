const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Register <=> Create new user
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      fullname: req.body.fullname,
      phone: req.body.phone,
      avatar: req.body.avatar,
      role: req.body.role,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, "MPBA", {
    expiresIn: "10s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, "MA");
};

let listRefreshToken = [];

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email }).populate("role");
    await bcrypt.compare(password, user.password);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    listRefreshToken.push(refreshToken);

    res.status(200).json({
      id: user._id,
      role: user.role,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(400).json("User name or password is invalid");
  }
});

// Refresh Tokens
router.post("/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(400).json("You're not authenticated");
  } else if (!listRefreshToken.includes(refreshToken)) {
    return res.status(400).json("Refresh token is invalid");
  }

  jwt.verify(refreshToken, "MA", (err, user) => {
    err && console.log(err);
    listRefreshToken = listRefreshToken.filter(
      (token) => token !== refreshToken
    );

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    listRefreshToken.push(newRefreshToken);
    console.log(
      "newAccessToken : " +
        newAccessToken +
        " - refreshToken: " +
        newRefreshToken
    );
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

const verify = (req, res, next) => {
  // console.log("verify: " + listRefreshToken);
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log("verify token: " + token);
    jwt.verify(token, "MPBA", (err, user) => {
      err && console.log(err);
      req.user = user;
      next();
    });
  } else {
    res.status(400).json("You're not authenticated");
  }
};

// Logout
router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  listRefreshToken = listRefreshToken.filter((token) => token !== refreshToken);
  res.status(200).json("Log out!");
});

module.exports = router;
