const router = require('express').Router();
const User = require('../../models/User'); 
const Post = require('../../models/Post');

// Register new user
router.post('/register', async (req, res) => {

  console.log('API URL:', req.originalUrl);
  console.log("hello register!!");

   try {
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      name: req.body.name,
      DOB: req.body.DOB,
      gender: req.body.gender,
      bio: req.body.bio
    });
    //console.log('User registered:', newUser);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(400).json(err);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json(err);
  }
});

// Logout user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userData);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json(err);
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const updatedUserData = await User.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true,
    });
    if (!updatedUserData[0]) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User profile updated successfully' });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json(err);
  }
});

// Delete user profile
router.delete('/:id', async (req, res) => {
  try {
     
    // Delete user's posts
    await Post.destroy({
      where: { userId: req.params.id }
    });
  
    const result = await User.destroy({
      where: { id: req.params.id }
    });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting user profile:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
