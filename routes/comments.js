const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")
const ExpressError = require("../utils/ExpressError")

const { commentSchema } = require("../joiSchemas")

const Fountain = require("../models/fountain")
const Comment = require("../models/comment")


const validateComment = (req, res, next) => {

    const commentBody = req.body

    const { error } = commentSchema.validate({ body: commentBody });
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


router.post("/", validateComment, catchAsync(async (req, res) => {
    const fountainId = req.params.id
    const commentBody = req.body

    const fountain = await Fountain.findById(fountainId)

    const comment = new Comment({ body: commentBody })

    fountain.comments.push(comment)

    await comment.save()

    await fountain.save()

    res.render("comments/showOne", { fountain, comment })
}))


router.delete("/:commentId", catchAsync(async (req, res) => {
    const { id, commentId } = req.params

    await Fountain.findByIdAndUpdate(id, { $pull: { comments: commentId } })

    await Comment.findByIdAndDelete(commentId)

    res.end()
}))

module.exports = router