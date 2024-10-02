const Post = require("../models/Post.js");
const mongoose = require("mongoose");

const criarPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

const mostrarPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const atualizarPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Updated");
    } else {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletarPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post Deleted");
    } else {
      res.status(403).json("You can't delete posts from other userss");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const curtirPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("Post not found");
    }
    const userId = new mongoose.Types.ObjectId(req.user._id);

    if (!post.likes || !Array.isArray(post.likes)) {
      post.likes = [];
    }

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Unliked");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

const comentarPost = async (req, res) => {
  const { userId, text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json("post not found");
    }
    const novoComentario = {
      userId: new mongoose.Types.ObjectId(userId),
      text: text,
      createdAt: new Date(),
    };

    post.comments.push(novoComentario);
    await post.save();
    res.status(200).json("Comment added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

const allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  criarPost,
  mostrarPost,
  atualizarPost,
  deletarPost,
  curtirPost,
  comentarPost,
  allPosts,
};
