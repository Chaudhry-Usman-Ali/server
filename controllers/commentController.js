const db = require('../models');

const Comment = db.comment;
const Post = db.post;
const User = db.user;

const getAllComments = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);

  if (post) {
    const comment = await Comment.findAll({
      where: { postId },
      include: [
        User,
      ],
    });
    res.status(200).json(comment);
  } else {
    res.status(404).json(`Post with id = ${postId} does not exist`);
  }
};

const getOneComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const post = await Post.findByPk(postId);

  if (post) {
    const comment = await Comment.findOne({ where: { postId, id: commentId } });
    res.status(200).json(comment);
  } else {
    res.status(404).json(`Post with id = ${postId} does not exist`);
  }
};

const createComment = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);

  const { content, userName, userEmail } = req.body;

  if (post && userName && userEmail) {
    const [user] = await User.findOrCreate({
      where: { name: userName, email: userEmail },
    });

    const comment = await Comment.create({
      postId: post.id,
      content,
      userId: user.id,
    });

    res.status(200).json(comment);
  } else {
    res.status(422).json('Bad User Input !');
  }
};

const deleteComment = async (req, res) => {
  console.log('\n\n\n', req.params);

  const { commentId } = req.params;
  if (commentId) {
    const comment = await Comment.destroy({ where: { id: commentId } });
    res.status(200).json(comment);
  } else {
    res.status(422).json('Bad User Input !');
  }
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;
  if (commentId) {
    const comment = await Comment.update(req.body, { where: { id: commentId } });
    res.status(200).json(comment);
  } else {
    res.status(422).json('Bad User Input !');
  }
};

module.exports = {
  getAllComments, getOneComment, createComment, deleteComment, updateComment,
};
