const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Get all users
router.get("/", async (req, res) => {
  await User.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get single user
router.get("/:id", async (req, res) => {
  if (req.params.id) {
    await User.findById(req.params.id)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

//Update user
router.patch("/:id", async (req, res) => {
  if (req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Get users follow month
router.post("/groupByMonth", async (req, res) => {
  await User.aggregate([
    {
      $project: {
        month: {
          month: { $month: "$createdAt" },
        },
      },
    },
    {
      $group: {
        _id: "$month",
        total_users_month: { $sum: 1 },
      },
    },
  ])
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get users follow year
router.post("/groupByYear", async (req, res) => {
  await User.aggregate([
    {
      $project: {
        year: {
          year: { $year: "$createdAt" },
        },
      },
    },
    {
      $group: {
        _id: "$year",
        total_users_year: { $sum: 1 },
      },
    },
  ])
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
