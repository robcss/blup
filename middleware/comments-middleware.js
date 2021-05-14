const ExpressError = require("../utils/ExpressError")

const { commentSchema } = require("../joiSchemas")

const CommentService = require("../services/CommentService")

module.exports.validateComment = (req, res, next) => {

    const commentBody = req.body

    const { error } = commentSchema.validate({ body: commentBody });
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isUserCommentAuthor = async (req, res, next) => {
    const { commentId } = req.params
    const userId = req.user._id

    const userIsCommentAuthor = await CommentService.isCommentCreatedByUser(commentId, userId)

    if (!userIsCommentAuthor) {
        req.flash('error', "You don't have permission to do that!");
        return res.status(401).send("")
    }
    next();
}