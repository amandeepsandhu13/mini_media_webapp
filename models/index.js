const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');
const Follows = require('./Follows');
const Likes = require('./Likes');

User.hasMany(Post, { 
    foreignKey: 'userId', 
    onDelete: 'CASCADE'
});

User.hasMany(Comment, { 
    foreignKey: 'userId' 
});

Post.belongsTo(User, { 
    foreignKey: 'userId', 
});

Comment.belongsTo(User, { 
    foreignKey: 'userId', 
});

Post.hasMany(Comment, { 
    foreignKey: 'postId', 
});

Comment.belongsTo(Post, { foreignKey: 'postId' });

User.belongsToMany(User, { through: Follows, as: 'Followers', foreignKey: 'followingId' });

User.belongsToMany(User, { through: Follows, as: 'Following', foreignKey: 'followerId' });

User.belongsToMany(Post, { through: Likes, as: 'LikedPosts', foreignKey: 'userId' });

Post.belongsToMany(User, { through: Likes, as: 'Likers', foreignKey: 'postId' });

module.exports = { User, Comment, Post, Follows, Likes };
