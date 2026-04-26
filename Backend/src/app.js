const express = require("express");
const multer = require("multer");
const uploadImage = require("./services/storage.service");
const postModel = require("./models/post.model");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const uploadFile = multer({ storage: multer.memoryStorage() });

app.post("/upload-post", uploadFile.single("image"), async (req, res) => {
  const { ownerId, title, content } = req.body;

  if (!ownerId || !title || !content || !req.file) {
    return res.status(400).json({
      message: "ownerId, title, content, and image are required",
    });
  }

  const uploadedImage = await uploadImage(req.file.buffer);
  const post = await postModel.create({
    ownerId,
    image: uploadedImage.url,
    title,
    content,
    createdAt: new Date(),
  });

  return res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

app.get("/all-post", async (req, res) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({
      message: "ownerId query parameter is required",
    });
  }

  const posts = await postModel.find({ ownerId }).sort({ createdAt: -1 });

  res.status(200).json({
    message: "Posts retrieved successfully",
    posts,
  });
});

app.get("/post/:id", async (req, res) => {
  const { ownerId } = req.query;
  const { id } = req.params;

  if (!ownerId) {
    return res.status(400).json({
      message: "ownerId query parameter is required",
    });
  }

  const post = await postModel.findOne({ _id: id, ownerId });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json({
    message: "Post retrieved successfully",
    post,
  });
});

app.delete("/delete-post/:id", async (req, res) => {
  const { id } = req.params;
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({
      message: "ownerId query parameter is required",
    });
  }

  await postModel.findOneAndDelete({ _id: id, ownerId });

  res.status(200).json({
    message: "Post deleted successfully",
  });
});

app.patch("/update-post/:id", uploadFile.single("image"), async (req, res) => {
  const { id } = req.params;
  const { ownerId, title, content } = req.body;

  if (!ownerId) {
    return res.status(400).json({ message: "ownerId is required" });
  }

  const updateData = {};

  if (title) updateData.title = title;
  if (content) updateData.content = content;

  if (req.file) {
    const uploadedImage = await uploadImage(req.file.buffer);
    updateData.image = uploadedImage.url;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      message: "At least one field must be updated",
    });
  }

  const post = await postModel.findOneAndUpdate(
    { _id: id, ownerId },
    updateData,
    { returnDocument: "after" },
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found or you are not authorized",
    });
  }

  res.status(200).json({
    message: "Post updated successfully",
    post,
  });
});

module.exports = app;
