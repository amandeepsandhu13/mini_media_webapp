const router = require("express").Router();
const { Comment, Post } = require("../../models/index");
const { withAuth, withAuthApi } = require("../../utils/auth");

// to see all the comments
router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_content: req.body.comment_content,
            userId: req.session.userId,
            postId: req.body.postId
        });

        res.status(200).json(newComment);
        res.render("add-comment");
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    // create a new comment
});

router.delete("/:id", async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: { id: req.params.id, userId: reqsession.userId },
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    // delete on tag by its `id` value
});
module.exports = router;
