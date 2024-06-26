const router = require("express").Router();
const { User,Comment,Post } = require('../models');
const { Op } = require("sequelize");

// Import the withAuth middleware
const { withAuth, withAuthApi } = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  res.redirect('/profile');
});

//router.get('/', async (req, res) => {
//  res.render('login', {
 //   logged_in: req.session.logged_in
 // });
//});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('register');
});
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.logged_in) {
      return res.redirect('/login'); // Redirect to login if not logged in
    }
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('user-profile', { 
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log('login failed');
    res.status(500).json(err);
  }
});


router.get('/profile/:userId', withAuth, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user details
    const userData = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });

    // Fetch posts by this user
    const userPosts = await Post.findAll({
      where: { userId: user.id },
      order: [['date', 'DESC']], // Example ordering, adjust as needed
    });

    // Determine if logged-in user owns the profile being viewed
    const isOwner = req.session.user_id === userId;

    // Render user profile page with user and posts data
    res.render('user-profile', {
      user,
      isOwner,
      userPosts, // Pass posts data to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});


// Route to render the update profile page
router.get('/update-profile/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });

    res.render('update-profile', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json(err);
  }
});
 
router.get("/comments/:postId", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.postId, {
      include: [
        {
          model: Comment,
          include: [User],
          order: [["createdAt", "DESC"]], // Sort comments by createdAt in descending order
        },
        User,
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    const post = postData.get({ plain: true });
    res.render("comments", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});  

// to show all posts
router.get("/posts", async (req, res) => {
  try {
       const postData = await Post.findAll({
        limit: 5, // Limit the query to 5 posts
      include: [{ model: User, attributes: ["name", "username"] }],
      order: [["date", "DESC"]],
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('all-posts', {
        posts,
        logged_in: req.session.logged_in,
        username: req.session.username,
      });  } catch (err) {
      console.error("Error fetching posts:", err);
      res.status(500).json(err);
  }
});

// to show add post page
router.get('/add-post', withAuthApi, async (req, res) => {
  try {
      const userId = req.query.userid;
      if (!userId) {
          return res.status(400).json({ message: "User ID is required." });
      }
      res.render("add-post", { userId });
  } catch (err) {
      console.error(`Error displaying add post page: `, err);
      res.status(500).json({
          message: "Failed to display add post page.",
          error: err,
      });
  }
});


module.exports = router;
