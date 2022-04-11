const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Get all users
router.get("/", async (req, res) => {
  await User.find()
    .populate("role")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Count data
router.get("/amountOfUsers", async (_, res) => {
  try {
    let totalCount = await User.count();
    // console.log(totalCount);
    res.status(200).json(totalCount);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get users follow month
router.get("/groupByMonth", async (req, res) => {
  const yearQuery = req.query.year;
  if (yearQuery) {
    await User.aggregate([
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
          total_users_month: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ])
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Get users follow year
router.get("/groupByWeek", async (req, res) => {
  const yearQuery = req.query.year;
  const weekQuery = req.query.week;
  if (yearQuery && weekQuery) {
    await User.aggregate([
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
          total_users_week: { $sum: 1 },
        },
      },
    ])
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Get single user
router.get("/:id", async (req, res) => {
  if (req.params.id) {
    await User.findById(req.params.id)
      .populate("role")
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
      .populate("role")
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.params.id) {
    await User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json("User deleted");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Send email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mean.news.nienluan@gmail.com",
    pass: "mean1234",
  },
});

router.post("/sendMail", async (req, res) => {
  const email = req.query.email;
  let mailOptions = {
    from: "mean.news.nienluan@gmail.com",
    to: email,
    subject: "Reset password",
    text: "Your new password: 123456. Use this password to login and reset your new password",
  };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("123456", salt);
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { password: hashedPassword } }
  );
  if (user) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json("Email sent: " + info.response);
      }
    });
  }
});

module.exports = router;
