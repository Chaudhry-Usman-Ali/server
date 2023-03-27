const db = require('../models');

const Post = db.post;
const User = db.user;

const getAllPosts = async (req, res) => {
  const posts = await Post.findAll({});
  res.status(200).json(posts);
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: { id },
    include: [
      User,
    ],
  });
  res.status(200).json(post);
};

const createPost = async (req, res) => {
  const {
    title, content, userName, userEmail,
  } = req.body;
  if (title && content) {
    const [user] = await User.findOrCreate({
      where: { name: userName, email: userEmail },
    });
    const post = await Post.create({
      title,
      content,
      userId: user.id,
    });

    res.status(200).json(post);
  } else {
    res.status(422).json('Bad User Input !');
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.destroy({ where: { id } });
  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const post = await Post.update(req.body, { where: { id } });
    res.status(200).json(post);
  } else {
    res.status(422).json('Bad User Input !');
  }
};

module.exports = {
  getAllPosts, getOnePost, createPost, deletePost, updatePost,
};
