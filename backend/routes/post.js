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
        .populate("authorID", "_id username avatar")
        .sort({ createdAt: -1 });
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
        .populate("authorID", "_id username avatar")
        .sort({ createdAt: -1 });
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
        .populate("authorID", "_id username avatar")
        .sort({ createdAt: -1 });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Count data
router.get("/amountOfPosts", async (_, res) => {
  try {
    let totalCount = await Post.count();
    res.status(200).json(totalCount);
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
router.post("/search/", async (req, res) => {
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

//Get total views of all posts
router.get("/getAllViews", async (_, res) => {
  await Post.aggregate([{ $group: { _id: 1, views: { $sum: "$view" } } }])
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get total likes of all posts
router.get("/getAllLikes", async (_, res) => {
  await Post.aggregate([{ $group: { _id: 1, likes: { $sum: "$like" } } }])
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get posts follow month
router.get("/groupByMonth", async (req, res) => {
  const yearQuery = req.query.year;
  if (yearQuery) {
    await Post.aggregate([
      {
        $project: {
          month: {
            month: { $month: "$createdAt" },
          },
          year: {
            year: { $year: "$createdAt" },
          },
        },
      },
      {
        $match: {
          year: { year: Number(yearQuery) },
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
          },
          total_posts_month: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ])
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Get posts follow week
router.get("/groupByWeek", async (req, res) => {
  const yearQuery = req.query.year;
  const weekQuery = req.query.week;
  if (yearQuery && weekQuery) {
    await Post.aggregate([
      {
        $project: {
          year: {
            year: { $year: "$createdAt" },
          },
          month: {
            month: { $month: "$createdAt" },
          },
          date: {
            date: { $dayOfMonth: "$createdAt" },
          },
          dayOfWeek: {
            dayOfWeek: { $dayOfWeek: "$createdAt" },
          },
          weekOfYear: {
            $week: "$createdAt",
            // $floor: { $divide: [{ $dayOfMonth: "$createdAt" }, 7] },
          },
        },
      },
      {
        $match: {
          year: { year: Number(yearQuery) },
          weekOfYear: Number(weekQuery),
        },
      },
      {
        $group: {
          _id: {
            // year: "$year",
            // month: "$month",
            date: "$date",
            dayOfWeek: "$dayOfWeek",
            weekOfYear: "$weekOfYear",
          },
          total_posts_week: { $sum: 1 },
        },
      },
    ])
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Get posts follow week
router.get("/groupByCategory", async (req, res) => {
  await Post.aggregate([
    {
      $group: {
        _id: "$categoriesID",
        total_posts_category: { $sum: 1 },
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
        total_posts_category: "$total_posts_category",
      },
    },
    {
      $sort: { total_posts_category: -1 },
    },
  ])
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get posts follow user
router.get("/groupByUser", async (req, res) => {
  await Post.aggregate([
    {
      $group: {
        _id: "$authorID",
        total_users__posts: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user_doc",
      },
    },
    {
      $project: {
        userName: "$user_doc.username",
        avatar: "$user_doc.avatar",
        total_users__posts: "$total_users__posts",
      },
    },
    {
      $sort: { total_users__posts: -1 },
    },
  ])
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/getViewByGroupUser", async (req, res) => {
  await Post.aggregate([
    {
      $group: {
        _id: "$authorID",
        totalView: { $sum: "$view" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user_doc",
      },
    },
    {
      $project: {
        userName: "$user_doc.username",
        totalView: "$totalView",
      },
    },
    {
      $sort: { totalView: -1 },
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

// Update like of post
router.patch("/updateLike/:id", async (req, res) => {
  if (req.params.id) {
    await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $inc: {
          like: 1,
        },
      },
      {
        new: true,
      }
    )
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

// Update like of post
router.patch("/updateView/:id", async (req, res) => {
  if (req.params.id) {
    await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $inc: {
          view: 1,
        },
      },
      {
        new: true,
      }
    )
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
