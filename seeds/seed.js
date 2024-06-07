const sequelize = require('../config/connection');
const seedPost = require('./postData');
const seedUser = require('./userData');
const seedComment = require('./commentData');
const seedFollows = require('./followsData');
const seedLikes = require('./likesData')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPost();

  await seedUser();

  await seedComment();

  await seedFollows();

  await seedLikes();

  process.exit(0);
};

seedAll();
