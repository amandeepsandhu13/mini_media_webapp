const router = require("express").Router();
const { Comment } = require("../../models/index");
const withAuth = require("../../utils/auth");

// to see all the comments
router.get("/:id", async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
        });
        if (!commentData) {
            res.status(404).json({
                message: "No comments found for this post",
            });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        console.error(err);
    }
});

// to add the comment

module.exports = router;
