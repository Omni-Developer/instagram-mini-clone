const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  ownerId: String,
  image: String,
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
