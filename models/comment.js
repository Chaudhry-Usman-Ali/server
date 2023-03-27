module.exports = (sequelize, DataTypes, Model) => {
  class Comment extends Model {}
  Comment.init({
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
