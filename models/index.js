const User = require('./User');
const Comment = require('./Comment');
const Post = require('./User');
const Profile = require('./Profile');
const Follows = require('./Follows');
const Likes = require('./Likes');

User.hasOne(Profile, { foreignKey: 'user_Id', onDelete: 'CASCADE',});

Profile.belongsTo(User, { foreignKey: 'user_Id', });

User.hasMany(Post, { foreignKey: 'user_Id', });

Post.belongsTo(User, { foreignKey: 'user_Id', });


User.hasMany(Comment, { foreignKey: 'user_Id', });

Comment.belongsTo(User, { foreignKey: 'user_Id', });


Post.hasMany(Comment, { foreignKey: 'post_Id', });

Comment.belongsTo(Post, { foreignKey: 'post_Id', });


User.belongsToMany(User, { through: Follows, as: 'Followers', foreignKey: 'following_Id', });

User.belongsToMany(User, { through: Follows, as: 'Following', foreignKey: 'follower_Id', });

User.belongsToMany(Post, { through: Likes, as: 'LikedPosts', foreignKey: 'user_Id', });

Post.belongsToMany(User, { through: Likes, as: 'Likers', foreignKey: 'post_Id', });



module.exports = { User, Comment, Post, Profile, Follows, Likes};