module.exports = {
    getComments(req, res) {
        res.status(200).send(req.store.posts[req.params.postId].comments)
    },

    addComment(req, res) {
        // let postId = req.params.postId
        let comments = []
        if(req.store.posts[req.params.postId].comments) {
            comments = req.store.posts[req.params.postId].comments
        }
        else {
            req.store.posts[req.params.postId]["comments"] = []
            comments = req.store.posts[req.params.postId].comments
        }
        let commentId = comments.length
        comments.push(req.body)
        res.status(201).send({postId: req.params.postId, commentId: commentId})        
    },

    updateComment(req, res) {
        Object.assign(req.store.posts[req.params.postId].comments[req.params.commentId], req.body)
        res.status(200).send(req.store.posts[req.params.postId].comments[req.params.commentId])
    },

    deleteComment(req, res) {
        req.store.posts[req.params.postId].comments.splice(req.params.commentId, 1)
        res.status(204).send({postId: req.params.postId, commentId: req.params.commentId}, " deleted")
    }
}
