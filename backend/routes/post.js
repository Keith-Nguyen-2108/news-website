const router = require("express").Router();
const Post = require("../models/Post");
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
        .sort({ createdAt: -1 })
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

// Sort articles by category
router.get("/getPostsFollowCate", async (_, res) => {
  await Post.aggregate([
    {
      $group: {
        _id: "$categoriesID",
        post: { $push: "$$ROOT" },
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
        post: "$post",
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

// Search
router.get("/search/", async (req, res) => {
  const searchStr = req.query.s;
  // console.log("Search String:", searchStr);
  if (!searchStr)
    return res.status(404).json({ Success: false, Message: "Not found" });
  // try {
  await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "authorID",
        foreignField: "_id",
        as: "authorID",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoriesID",
        foreignField: "_id",
        as: "categoriesID",
      },
    },
    {
      $match: {
        $or: [
          { "authorID.fullname": { $regex: searchStr, $options: "si" } },
          { title: { $regex: searchStr, $options: "si" } },
          { "categoriesID.cateName": { $regex: searchStr, $options: "si" } },
        ],
      },
    },
    {
      $unset: [
        "authorID.email",
        "authorID.password",
        "authorID.phone",
        "authorID.avatar",
        "authorID.username",
        "authorID.role",
        "authorID.createdAt",
        "authorID.updatedAt",
        "categoriesID.createdAt",
        "categoriesID.updatedAt",
      ],
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

// UPDATE
router.patch("/:id", async (req, res) => {
  if (req.params.id) {
    const updatePost = req.body;
    // console.log("Post Update :" ,updatePost);
    const post = await Post.findByIdAndUpdate(req.params.id, updatePost, {
      new: true,
    });
    await post
      .save()
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json("The post is invalid");
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
  } else {
    res.status(400).json("The post is invalid");
  }
});

module.exports = router;
