const router = require("express").Router();
const { Post } = require("../../models/index");
const withAuth = require("../../utils/auth");

// to get all users
// /api/users
router.get("/", async (req, res) => {
    try {
        const usersData = await User.findAll();
        res.status(200).json(usersData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// to get each user
router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Post }],
        });
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// to delete the user
router.delete("/:id", async (req, res) => {
    try {
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
