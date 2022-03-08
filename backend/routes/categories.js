const router = require("express").Router();
const Category = require("../models/Category");

// Create
router.post("/create", async (req, res) => {
  const newCate = new Category({
    cateName: req.body.cateName,
    parentID: req.body.parentID,
  });
  await newCate
    .save()
    .then(() => {
      res.status(200).json(newCate);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.params.id) {
    await Category.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json("Category deleted");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Get all category
router.get("", async (_, res) => {
  await Category.find()
    .populate({
      path: "parentID",
      select: "_id cateName parentID",
      populate: {
        path: "parentID",
        select: "_id cateName parentID",
      },
    })
    .then((cate) => {
      res.status(200).json(cate);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/childFromParent", async (_, res) => {
  await Category.aggregate([
    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentID",
        as: "child",
      },
    },
    {
      $project: {
        cateName: "$cateName",
        childName: {
          $reduce: {
            input: "$child",
            initialValue: "",
            in: {
              $concat: ["$$value", ",", "$$this.cateName"],
            },
          },
        },
      },
    },
  ])
    .then((cate) => {
      res.status(200).json(cate);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
