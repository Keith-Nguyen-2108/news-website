const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Role", RoleSchema);
