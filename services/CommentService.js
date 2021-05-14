const Comment = require("../models/comment")

class CommentService {

    async getComment(id) {
        const comment = await Comment.findById(id)
        return comment
    }

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

    async isCommentCreatedByUser(id, userId) {
        const comment = await this.getComment(id)
        return comment.author.equals(userId)
    }


}

module.exports = new CommentService