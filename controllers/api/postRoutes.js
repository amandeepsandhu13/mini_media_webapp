const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { Post, User, Comment } = require("../../models");
const { withAuth, withAuthApi } = require("../../utils/auth");

// to show all posts GET /api/posts
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

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images"); // Adjust the path based on your project structure
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

// POST /api/posts/add-post
router.post(
    "/add-post",
    withAuthApi,
    upload.single("image"),
    async (req, res) => {
        try {
            const { title, post_contents, userId } = req.body;

            if (!userId) {
                return res
                    .status(400)
                    .json({ message: "User ID is required." });
            }

            // Handle the image upload
            let imageUrl = req.body.image_url; // Use the URL if provided in the form

            if (req.file) {
                imageUrl = `/images/${req.file.filename}`; // Update the image URL if a file is uploaded
            }

            // Create the new post with the image URL
            const newPost = await Post.create({
                title,
                post_contents,
                image_url: imageUrl,
                userId,
            });

            res.redirect(`/profile`);
        } catch (err) {
            console.error("Error during adding the post:", err);
            res.status(400).json(err);
        }
    }
);

// DELETE route to delete a post
router.delete("/:postId/delete", withAuthApi, async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.session.userId;
        // Find the post by postId
        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the logged-in user is the owner of the post
        if (post.userId.toString() !== req.session.userId) {
            return res
                .status(403)
                .json({ error: "You are not authorized to delete this post" });
        }

        // Perform deletion
        await post.remove();

        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(`The error found in the app : ` + err);
        res.status(500).json(err);
    }
});

router.get("/comments/:id", async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["id", "username", "name"],
                },
                {
                    model: Post,
                    attributes: ["id"],
                    include: {
                        model: User,
                        attributes: ["id", "username"],
                    },
                },
            ],
        });
        console.log(commentData);
        const comments = commentData.get({ plain: true });

        res.render("commentsbyid", {
            ...comments,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
