const { Follows} = require('../models');

const followsdata = [
  {
    followed_id: '001',
    follower_id: '002',
    dateCreated:'06/07/2024'
  },
  
];

const seedFollows = () => Follows.bulkCreate(followsdata);

module.exports = seedFollows;