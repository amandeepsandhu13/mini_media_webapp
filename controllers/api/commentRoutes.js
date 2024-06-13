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

router.post('/', async (req, res) => {
    try { const commentData = await 
      Comment.create(req.body);
      res.status(200).json(commentData);
      }
      catch(err){
        console.log(err);
        res.status(500).json(err);
      }
    // create a new comment
  });


module.exports = router;
