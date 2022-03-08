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
