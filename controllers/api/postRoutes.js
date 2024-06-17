const router = require("express").Router();
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

// POST /api/posts/add-post
router.post('/add-post', withAuthApi, async (req, res) => {
    try {
      const { title, post_contents, image_url, userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
      const newPost = await Post.create({
        title,
        post_contents,
        image_url,
        userId,
      });
      res.redirect(`/profile`);

    } catch (err) {
      console.error('Error during adding the post:', err);
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

router.get('/comments/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                  model: User,
                  attributes: ['id', 'username', 'name',],
                },
                {
                    model: Post,
                    attributes: ['id'],
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                },
              ],
        });
        console.log(commentData);
        const comments = commentData.get({ plain: true });
    
        res.render('commentsbyid', {
          ...comments,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });
module.exports = router;
