const router = require("express").Router();
const { User, Post } = require("../../models");
const { withAuthApi, withAuth } = require("../../utils/auth");

// Register new user
router.post("/register", async (req, res) => {
    try {
        //const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            name: req.body.name,
            DOB: req.body.DOB,
            gender: req.body.gender,
            bio: req.body.bio,
        });
          // Save session and respond
          req.session.user_id = newUser.id;
          req.session.logged_in = true;
        req.session.save(() => {
           res.status(200).json(newUser);
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(400).json(err);
    }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("Invalid password");
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // Redirect to the profile page after successful login
      res.redirect("/profile");      
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Logout user with GET request
router.get("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect("/login"); // Redirect to the login page after logout
        });
    } else {
        res.status(404).end();
    }
});

// Logout user
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Get user profile
router.get("/:id", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                    attributes: ["id", "title", "content", "createdAt"],
                },
            ],
        });
        if (!userData) {
            return res.status(404).render("404", { message: "User not found" });
        }
        const user = userData.get({ plain: true });
        res.render("profile", {
            user,
            posts: user.posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json(err);
    }
});

//update user data
router.put("/profile/:id", withAuth, async (req, res) => {
    const { name, username, DOB, gender, bio } = req.body;
    const userId = req.params.id;
    try {
        const [updatedCount] = await User.update(
            { name, username, DOB, gender, bio },
            { where: { id: userId }, individualHooks: true }
        );

        if (updatedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByPk(userId);
        res.status(200).json({
            message: "User profile updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error updating user profile:", err);
        res.status(500).json({ error: "Failed to update user profile" });
    }
});

// Delete user profile
router.delete("/api/user/delete/:id", withAuthApi, async (req, res) => {
    try {
        // Delete user's posts
        await Post.destroy({
            where: { userId: req.params.id },
        });

        const result = await User.destroy({
            where: { id: req.params.id },
        });
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).end();
    } catch (err) {
        console.error("Error deleting user profile:", err);
        res.status(500).json(err);
    }
});

module.exports = router;
