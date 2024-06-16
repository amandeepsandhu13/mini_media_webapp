const router = require("express").Router();
const { User,Comment,Post } = require('../models');
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

    res.render('user-profile', { 
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log('login failed');
    res.status(500).json(err);
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


 
router.get('/comments', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,Post,
          attributes: ['username','name'],
        },
      ],
    });

    const allcomments = commentData.map((Comment) =>
      Comment.get({ plain: true })
    );

    res.render('comments', {
      allcomments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/comments/:id', async (req, res) => {
  try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [
          {
            model: User,Post,
            attributes: ['username','name'],
          },
        ],
      });
  
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
