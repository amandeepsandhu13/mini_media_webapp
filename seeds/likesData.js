const { Likes } = require('../models');

const likesdata = [
  {
    post_id:'1',
    user_Id:'1',
    dateCreated:'06/07/2024',

  },
];

const seedLikes= () => Likes.bulkCreate(likesdata);

module.exports = seedLikes;