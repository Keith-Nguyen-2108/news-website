const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 8000;
const multer = require("multer");
const path = require("path");
const multiParty = require("connect-multiparty");
const middleWare = multiParty();
const fs = require("fs");

const roleRoute = require("./routes/role");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/categories");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comments");
const userRoute = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://NienLuan:NienLuan@cluster0.u8igy.mongodb.net/news?retryWrites=true&w=majority"
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// ############################# USER AVATAR #################################

// Upload avatar
app.use(
  "/images/avatar",
  express.static(path.join(__dirname, "/images/avatar"))
);

// Upload avatar to folder images/avatar
const storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/avatar");
  },
  filename: (req, file, callback) => {
    let d = new Date();
    let moment =
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear() +
      "-" +
      d.getHours() +
      "-";
    callback(null, moment + req.body.name);
  },
});

// Middleware uploadAvatar -
const uploadAvatar = multer({ storage: storageAvatar });

app.post("/api/upload/avatar", uploadAvatar.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// ############################# POST #################################

//Folder image for post
app.use("/images/post", express.static(path.join(__dirname, "/images/post")));

// Upload image to folder images/post
const storageImagePost = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/post/avatar");
  },
  filename: (req, file, callback) => {
    let d = new Date();
    let moment =
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear() +
      "-" +
      d.getHours() +
      "-";
    callback(null, moment + file.originalname);
  },
});

//Upload image for post
app.post("/api/upload/post", middleWare, (req, res) => {
  fs.readFile(req.files.upload.path, function (err, data) {
    let d = new Date();
    let moment =
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear() +
      "-" +
      d.getHours() +
      "-";
    const target = path.join(
      __dirname,
      "/images/post/content/" + moment + req.files.upload.name
    );
    // var newPath = __dirname + '/images/post/' + req.files.upload.name;
    fs.writeFile(target, data, function (err) {
      if (err) console.log({ err: err });
      else {
        res.status(200).json({
          uploaded: true,
          url: `http://localhost:8000/images/post/content/${
            moment + req.files.upload.name
          }`,
        });
      }
    });
  });
});

// Middleware uploadImagePost
const uploadImagePost = multer({ storage: storageImagePost });
app.post(
  "/api/upload/post/avatar",
  uploadImagePost.single("file"),
  (_, res) => {
    res.status(200).json("File has been uploaded");
  }
);

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);
