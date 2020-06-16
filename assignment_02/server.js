const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan');
const routes = require('./routes')

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

let store = {
    posts: [
        {
            name: 'This is post heading',
            url: 'https://github.com/',
            text: 'This is the post description',
            comments: [
                {text: 'This is the comment-1 for post-1'}    
            ]
        }
    ]
}

app.use((req, res, next) => {
    req.store = store
    next();
})

app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:postId', routes.posts.updatePost)
app.delete('/posts/:postId', routes.posts.deletePost)

app.get('/posts/:postId/comments', routes.comments.getComments)
app.post('/posts/:postId/comments', routes.comments.addComment)
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComment)
app.delete('/posts/:postId/comments/:commentId', routes.comments.deleteComment)

app.listen(3000)


//GET
// curl

//POST
// curl -H "Content-Type: application/json" -X POST -d "{\"name\": \"Top 10 ES6 Features\", \"url\":\"http://webapplog.com/es6\", \"text\": \"some text\"}"  "http://localhost:3000/posts"

// curl -H "Content-Type: application/json" -X POST -d "{\"text\": \"This is the comment for post 1\"}"  "http://localhost:3000/posts/0/comments"