const router = require("express").Router();
const Role = require("../models/Role");

// Insert new role
router.post("/create", async (req, res) => {
  const newRole = new Role({
    roleName: req.body.roleName,
  });

  await newRole
    .save()
    .then(() => {
      res.status(200).json(newRole);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get all roles
router.get("", async (_, res) => {
  await Role.find()
    .then((role) => {
      res.status(200).json(role);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Get single role
router.get("/:id", async (req, res) => {
  if (req.params.id) {
    await Role.findById(req.params.id)
      .then((role) => {
        res.status(200).json(role);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

//Update
router.patch("/:id", async (req, res) => {
  if (req.params.id) {
    await Role.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .then((role) => {
        res.status(200).json(role);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.params.id) {
    await Role.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json("Role deleted");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

module.exports = router;
