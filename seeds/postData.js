const { Post } = require('../models');

const postdata = [
  {
    title: 'my day',
    post_contents: "Look What I'm eating",
    image_url: 'ddddd.jpg',
    date: 'June 22, 2021 09:00:00',  
    user_id:'001'
  },

];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
