const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('blog_db', 'lebron', 'james', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

(async () => {
  await sequelize.sync();
  console.log('Database schema synchronized');
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes, Model);
db.post = require('./post')(sequelize, DataTypes, Model);
db.comment = require('./comment')(sequelize, DataTypes, Model);

db.user.hasMany(db.post, { as: 'posts', foreignKey: 'userId' });
db.user.hasMany(db.comment, { as: 'comments', foreignKey: 'userId' });

db.post.belongsTo(db.user, { foreignKey: 'userId' });
db.post.hasMany(db.comment, { as: 'comments', foreignKey: 'postId' });

db.comment.belongsTo(db.user, { foreignKey: 'userId' });
db.comment.belongsTo(db.comment, { foreignKey: 'postId' });

module.exports = db;
