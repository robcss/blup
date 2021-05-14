const FountainService = require("../services/FountainService")
const CommentService = require("../services/CommentService")


module.exports.createComment = async (req, res) => {
    const fountainId = req.params.id
    const commentBody = req.body
    const userId = req.user._id

    const newComment = await CommentService.createComment({ body: commentBody, author: userId })

    let fountain;

    try {

        fountain = await FountainService.addComment(fountainId, newComment._id)

    } catch (error) {

        await CommentService.deleteComment(newComment._id)

        req.flash('error', 'Could not add comment!');
        return res.status(401).send("")
    }

    const comment = await CommentService.getCompleteComment(newComment._id)

    res.render("comments/showOne", { fountain, comment })
}

module.exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params

    await FountainService.removeComment(id, commentId)

    await CommentService.deleteComment(commentId)

    res.end()
}


// module.exports.createComment = async (req, res) => {

//     const fountainId = req.params.id
//     const commentBody = req.body

//     const fountain = await Fountain.findById(fountainId)

//     const newComment = new Comment({ body: commentBody })
//     newComment.author = req.user._id;

//     fountain.comments.push(newComment)

//     await newComment.save()

//     await fountain.save()

//     const comment = await Comment.findById(newComment._id).populate('author')

//     res.render("comments/showOne", { fountain, comment })
// }

// module.exports.deleteComment = async (req, res) => {
//     const { id, commentId } = req.params

//     await Fountain.findByIdAndUpdate(id, { $pull: { comments: commentId } })

//     await Comment.findByIdAndDelete(commentId)

//     res.end()
// }