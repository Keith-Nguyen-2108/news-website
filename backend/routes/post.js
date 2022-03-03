const router = require("express").Router();
const Post = require("../models/Post");

// Create
router.post("/create", async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    categoriesID: req.body.categoriesID,
    avatar: req.body.avatar,
    authorID: req.body.authorID,
    status: req.body.status,
    commentsID: req.body.commentsID,
  });

  await newPost
    .save()
    .then(() => {
      res.status(200).json(newPost);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get all posts
router.get("", async (_, res) => {
  await Post.find()
    .populate("categoriesID", "_id cateName parentID")
    .populate("authorID", "_id username avatar")
    .populate({
      path: "commentsID",
      populate: {
        path: "authorID",
        select: "_id username avatar",
      },
    })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
