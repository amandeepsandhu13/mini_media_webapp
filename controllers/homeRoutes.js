const router = require("express").Router();
const { User, Post } = require('../models');
// Import the withAuth middleware
const { withAuth } = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('login', {
    logged_in: req.session.logged_in
  });
});

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
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });

    // Determine if logged-in user owns the profile being viewed
    const isOwner = req.session.user_id === user.id;
    res.render('user-profile', { 
      user,
      isOwner,
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


module.exports = router;
