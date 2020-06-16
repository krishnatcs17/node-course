module.exports = {
    getPosts(req, res){
        res.status(200).send(req.store.posts)
    },

    addPost(req, res) {
        let postId = req.store.posts.length
        req.store.posts.push(req.body)
        res.status(201).send({postId: postId})
    },

    updatePost(req, res) {
        Object.assign(req.store.posts[req.params.postId], req.body)
        res.status(200).send(req.store.posts[req.params.postId])
    },

    deletePost(req, res) {
        req.store.posts.splice(req.params.postId, 1)
        res.status(204).send({postId: req.params.postId}, " deleted")
    }
}
