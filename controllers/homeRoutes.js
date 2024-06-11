const router = require("express").Router();
const { User } = require("../models/User");

//register new user
router.post("/register", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//login user
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        });

        if (!userData) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect email or password, please try again",
            });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//logout user
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
router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update user profile
router.put("/:id", async (req, res) => {
    try {
        const updatedUserData = await User.update(req.body, {
            where: { id: req.params.id },
            individualHooks: true,
        });
        if (!updatedUserData[0]) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User profile updated successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user profile
router.delete("/:id", async (req, res) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id },
        });
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(204).end();
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
