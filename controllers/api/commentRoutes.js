const router = require("express").Router();
const { Comment } = require("../../models/index");
const { withAuth, withAuthApi } = require("../../utils/auth");

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
router.post("/:postid", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.postid,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error(`The error found while posting the comment`, err);
    }
});

// to delete the comment

module.exports = router;
