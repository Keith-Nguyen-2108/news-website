const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = 8000;

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

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);

// const users = [
//   {
//     id: 1,
//     username: "test@gmail.com",
//     password: "091020",
//     role: "author",
//   },
//   {
//     id: 2,
//     username: "test1@gmail.com",
//     password: "210820",
//     role: "admin",
//   },
// ];

// app.get("/", (req, res) => {
//   console.log("Start server");
// });

// const generateAccessToken = (user) => {
//   return jwt.sign({ id: user.id, role: user.role }, "MPBA", {
//     expiresIn: "10s",
//   });
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign({ id: user.id, role: user.role }, "MA");
// };

// let listRefreshToken = [];

// app.post("/api/refresh", (req, res) => {
//   const refreshToken = req.body.token;

//   if (!refreshToken) {
//     return res.status(400).json("You're not authenticated");
//   } else if (!listRefreshToken.includes(refreshToken)) {
//     return res.status(400).json("Refresh token is invalid");
//   }

//   jwt.verify(refreshToken, "MA", (err, user) => {
//     err && console.log(err);
//     listRefreshToken = listRefreshToken.filter(
//       (token) => token !== refreshToken
//     );

//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);
//     listRefreshToken.push(newRefreshToken);
//     console.log(
//       "newAccessToken : " +
//         newAccessToken +
//         " - refreshToken: " +
//         newRefreshToken
//     );
//     res.status(200).json({
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   });
// });

// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await users.find((u) => {
//       return u?.username === username && u?.password === password;
//     });

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);
//     listRefreshToken.push(refreshToken);

//     res.status(200).json({
//       id: user.id,
//       role: user.role,
//       accessToken,
//       refreshToken,
//     });
//     console.log("login: " + listRefreshToken);
//   } catch (err) {
//     res.status(400).json("User name or password is invalid");
//   }
// });

// const verify = (req, res, next) => {
//   console.log("verify: " + listRefreshToken);
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     console.log("verify token: " + token);
//     jwt.verify(token, "MPBA", (err, user) => {
//       err && console.log(err);
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(400).json("You're not authenticated");
//   }
// };

// app.post("/api/logout", verify, (req, res) => {
//   const refreshToken = req.body.token;
//   listRefreshToken = listRefreshToken.filter((token) => token !== refreshToken);
//   res.status(200).json("Log out!");
// });

// app.delete("/api/user/:userId", verify, (req, res) => {
//   if (req.user.id === req.params.userId) {
//     console.log("User has been deleted");
//   }
// });

// User Schema

// const UserSchema = new mongoose.Schema({
//   username: String,
// });

// const PostSchema = new mongoose.Schema({
//   title: String,
//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Comment",
//     },
//   ],
// });

// const CommentsSchema = new mongoose.Schema({
//   content: String,
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

// const Post = mongoose.model("Post", PostSchema, "posts");
// const Comment = mongoose.model("Comment", CommentsSchema, "comments");
// const User = mongoose.model("User", UserSchema, "users");

// let s = "sinh";

// Post.find({
//   title: { $regex: `${s}`, $options: "i" },
// })
//   .populate("comments")
//   .populate({
//     path: "comments",
//     populate: { path: "userId" },
//   })
//   .then((res) => {
//     console.log(JSON.stringify(res));
//   })
//   .catch((err) => {
//     console.log(err);
//   });
