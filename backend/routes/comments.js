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

module.exports = router;
