const router = require("express").Router();
const { Post, User } = require("../../models/index");
const { withAuth, withAuthApi } = require("../../utils/auth");
// Route to fetch all posts data
router.get("/", async (req, res) => {
    try {
      const postsData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const posts = postsData.map(post => post.get({ plain: true }));
      console.log(posts);
      // Render the all-posts.handlebars template with the posts data
      res.render('all-posts', { 
        posts,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json(err);
    }
  });

// getting the posts as per each user
router.get("/:userid", async (req, res) => {
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

// to add the post
router.post("/", withAuthApi, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// to delete each post
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
