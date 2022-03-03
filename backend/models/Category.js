const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    cateName: {
      type: String,
      require: true,
      unique: true,
    },
    parentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", CategorySchema);
