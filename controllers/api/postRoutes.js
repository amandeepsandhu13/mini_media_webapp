const router = require("express").Router();
const { Post, User } = require("../../models");
const { withAuth, withAuthApi } = require("../../utils/auth");
// Route to fetch all posts data
router.get("/", async (req, res) => {
    try {

        const postData = await Post.findAll({
            include: [{ model: User, attributes: ["name", "username"] }],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("all-posts", { posts, logged_in: req.session.logged_in });
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json(err);

    }
  });

// getting the posts as per each user
router.get("/user/:userid", async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                user_id: req.params.userid,
            },
        });

        if (!userPosts) {
            res.status(404).json({ message: "No posts found for this user" });
            return;
        }

        res.status(200).json(userPosts);
    } catch (err) {
        console.error(`Error fetching user posts:`, err);
        res.status(500).json({
            message: "Failed to fetch user posts",
            error: err,
        });
    }
});

// to show add post page
router.get("/add-post", withAuthApi, async (req, res) => {
    try {
        const userId = req.query.userid;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        res.render("add-post", { userId });
    } catch (err) {
        console.error(`The error while displaying the page to add post: `, err);
        res.status(500).json({
            message: "Failed to display add post page.",
            error: err,
        });
    }
});

// to add the post
router.post("/add-post", withAuthApi, async (req, res) => {
    try {
        const { title, post_contents, image_url, userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const newPost = await Post.create({
            title,
            post_contents,
            image_url,
            userId,
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.error("Error during adding the post:", err);
        res.status(400).json(err);
    }
});

// to delete the post
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.error(`The error found in the app : ` + err);
        res.status(500).json(err);
    }
});

module.exports = router;
