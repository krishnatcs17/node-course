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
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
            comments: [
                {text: 'Cruel…..var { house, mouse} = No type optimization at all'}    
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