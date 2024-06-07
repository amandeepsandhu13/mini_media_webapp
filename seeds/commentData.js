const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'wow, incredible',
    user_id: '2',
    post_id:'1'
  },
  {
    comment_text: 'liked',
    user_id: '2',
    post_id:'1'
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
