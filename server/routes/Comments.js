const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

// get all comments related to a certain post
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});

// create a comment 
router.post('/', validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
})

// delete
router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({
        where: {
            id: commentId
        }
    })
    res.json("Deleted Successfuly")
})



module.exports = router;