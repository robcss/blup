const Comment = require("../models/comment")
const FountainService = require("./FountainService")

class CommentService {

    async getCompleteComment(id) {
        const comment = await Comment.findById(id).populate('author')
        return comment
    }

    async createComment(data) {
        const newComment = new Comment(data)
        await newComment.save()
        return newComment
    }

    async deleteComment(id) {
        await Comment.findByIdAndDelete(id)
    }

}

module.exports = new CommentService