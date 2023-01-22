const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require('bcrypt');
const { validateToken } = require("../middlewares/AuthMiddleware")
const { sign } = require("jsonwebtoken")


router.post("/", async (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("Success");
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "User Doesn't Exist" });

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Username and password Combination" });

        const accessToken = sign({
            username: user.username, id: user.id
        },
            "importantsecret"
        );

        res.json({ token: accessToken, username: username, id: user.id })
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id

    const basicinfo = await Users.findByPk(id, { attributes: { exclude: ["password"] } });

    res.json(basicinfo);

})

router.put("/changePassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });

    bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) res.json({ error: "Password doesn't match" });

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({ password: hash }, { where: { username: req.user.username } })
            res.json("")
        })

    })
})

module.exports = router;