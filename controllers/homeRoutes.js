const router = require('express').Router();

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/profile', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('user-profile', { 
    title: 'Profile', 
    user: req.session.user 
  });
});

router.get('/update-profile', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('update-profile', { 
    title: 'Update Profile', 
    user: req.session.user 
  });
});

module.exports = router;
