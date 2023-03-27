/* eslint-disable max-len */
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
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
