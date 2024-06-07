const { Follows} = require('../models');

const followsdata = [
  {
    following_id: '001',
    follower_id: '002',
  },
  
];

const seedFollows = () => Follows.bulkCreate(followsdata);

module.exports = seedFollows;