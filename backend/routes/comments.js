const router = require("express").Router();
const Comment = require("../models/Comment");

// Create new comment
router.post("/create", async (req, res) => {
  const newCmt = new Comment({
    content: req.body.content,
    authorID: req.body.authorID,
    parentID: req.body.parentID,
    postID: req.body.postID,
  });

  await newCmt
    .save()
    .then(() => {
      res.status(200).json(newCmt);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get all comments
router.get("", async (_, res) => {
  await Comment.find()
    .populate("postID", "_id")
    .populate("authorID", "_id username avatar")
    .then((cmt) => {
      res.status(200).json(cmt);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get comment/s follow PostID
router.get("/getCommentsFollowPost", async (req, res) => {
  const postID = req.query.postID;
  let comments;
  try {
    if (postID) {
      comments = await Comment.find({ postID })
        .populate("postID", "_id")
        .populate("authorID", "_id username avatar");
    } else {
      comments = await Comment.find()
        .populate("postID", "_id")
        .populate("authorID", "_id username avatar");
    }
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
