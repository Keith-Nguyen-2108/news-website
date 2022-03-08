const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    shortDescription: {
      type: String,
      require: true,
      default: "",
    },
    description: {
      type: String,
      require: true,
      default: "",
    },
    categoriesID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    avatar: {
      type: String,
      require: true,
      default: "",
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not approved yet",
    },
    like: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
    commentsID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
