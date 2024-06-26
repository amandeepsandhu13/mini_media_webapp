const sequelize = require("../config/connection");
const { Post, User, Comment, Follows, Likes } = require("../models");
const postData = require("./postData.json");
const userData = require("./userData.json");
const commentData = require("./commentData.json");
const followsData = require("./followsData.json");
const likesData = require("./likesData.json");

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const users = await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        const posts = await Post.bulkCreate(postData, {
            individualHooks: true,
            returning: true,
        });

        const comments = await Comment.bulkCreate(commentData, {
            individualHooks: true,
            returning: true,
        });

        const follows = await Follows.bulkCreate(followsData, {
            individualHooks: true,
            returning: true,
        });

        const likes = await Likes.bulkCreate(likesData, {
            individualHooks: true,
            returning: true,
        });

        console.log("All data seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("Failed to seed database:", error);
        process.exit(1);
    }
};
seedDatabase();
