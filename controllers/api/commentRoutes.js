const router = require("express").Router();
const { Comment, Post } = require("../../models/index");
const { withAuth, withAuthApi } = require("../../utils/auth");

// Route to create a new comment
router.post('/:postId', withAuthApi, async (req, res) => {
    try{
    const { postId } = req.params;
    const  content  = req.body.content;
    const userId = req.session.user_id;
    console.log("comment content "+content);
    if (!userId) {
        return res.status(401).json({ message: 'You must be logged in to comment.' });
      }
  
      const newComment = await Comment.create({
        comment_content: content,
        postId,
        userId,
      });
  
      res.status(201).json(newComment);
    } catch (err) {
      console.error('Error creating comment:', err);
      res.status(500).json(err);
    }
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
