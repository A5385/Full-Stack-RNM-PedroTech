const express = require('express');
const app = express()
app.use(express.json())
const cors = require('cors')
const db = require('./models')

app.use(cors({
    // origin: "http://localhost:3001"
}));


// Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);

const userRouter = require('./routes/Users.js');
app.use('/auth', userRouter);

const likesRouter = require("./routes/Likes");
app.use("/like", likesRouter);



db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001');
    })
})


