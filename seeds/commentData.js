const { Comment } = require('../models');

const commentdata = [
  {
    comment_content: 'wow, incredible',
    user_id: '2',
    post_id:'1',
    dateCreated:'06/07/2024'
  },

];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
