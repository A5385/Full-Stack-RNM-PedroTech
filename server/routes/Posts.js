const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

// router.post()

// ------------ select all
router.get("/", validateToken, async (req, res) => {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

// ----------- select by id
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

// ------------- select by user id
router.get('/byUserId/:id', async (req, res) => {
    const id = req.params.id;
    const listOfPost = await Posts.findAll({ where: { UserId: id }, include: [Likes] });
    res.json(listOfPost)
})

// ------------ insert record
router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id
    await Posts.create(post);
    res.json(post)
})

// ---------- Update Post
router.put('/title', validateToken, async (req, res) => {
    const { newTitle, id } = req.body;
    await Posts.update({ title: newTitle }, { where: { id: id } })
    res.json(newTitle)
})
router.put('/postText', validateToken, async (req, res) => {
    const { newText, id } = req.body;
    await Posts.update({ postText: newText }, { where: { id: id } })
    res.json(newText)
})

// ------------- delete post
router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
        where: {
            id: postId,
        },
    });

    res.json("DELETED SUCCESSFULLY");
});



module.exports = router 