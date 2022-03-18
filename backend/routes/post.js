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
router.get("", async (req, res) => {
  try {
    const authorID = req.query.authorID;
    const categoriesID = req.query.categoriesID;
    let posts;
    if (authorID) {
      posts = await Post.find({ authorID })
        .populate("categoriesID", "_id cateName")
        .populate({
          path: "categoriesID",
          populate: {
            path: "parentID",
            select: "_id cateName parentID",
          },
        })
        .populate("authorID", "_id username avatar");
    } else if (categoriesID) {
      posts = await Post.find({ categoriesID })
        .populate("categoriesID", "_id cateName")
        .populate({
          path: "categoriesID",
          populate: {
            path: "parentID",
            select: "_id cateName parentID",
          },
        })
        .populate("authorID", "_id username avatar");
    } else {
      posts = await Post.find()
        .populate("categoriesID", "_id cateName")
        .populate({
          path: "categoriesID",
          populate: {
            path: "parentID",
            select: "_id cateName parentID",
          },
        })
        .populate("authorID", "_id username avatar");
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sort articles by category
router.get("/getPostsFollowCate", async (_, res) => {
  await Post.aggregate([
    {
      $group: {
        _id: "$categoriesID",
        postID: { $first: "$_id" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "cate_doc",
      },
    },
    {
      $project: {
        cateName: "$cate_doc.cateName",
        postID: "$postID",
      },
    },
  ])
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get single post
router.get("/:id", async (req, res) => {
  if (req.params.id) {
    await Post.findById(req.params.id)
      .populate("categoriesID", "_id cateName")
      .populate({
        path: "categoriesID",
        populate: {
          path: "parentID",
          select: "_id cateName parentID",
        },
      })
      .populate("authorID", "_id username avatar")
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.params.id) {
    await Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json("Post deleted");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
