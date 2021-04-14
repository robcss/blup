const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { validateComment, isLoggedInComments } = require("../middleware")

const Fountain = require("../models/fountain")
const Comment = require("../models/comment")


router.post("/", isLoggedInComments, validateComment, catchAsync(async (req, res) => {
    const fountainId = req.params.id
    const commentBody = req.body

    const fountain = await Fountain.findById(fountainId)

    const comment = new Comment({ body: commentBody })

    fountain.comments.push(comment)

    await comment.save()

    await fountain.save()

    res.render("comments/showOne", { fountain, comment })
}))


router.delete("/:commentId", isLoggedInComments, catchAsync(async (req, res) => {
    const { id, commentId } = req.params

    await Fountain.findByIdAndUpdate(id, { $pull: { comments: commentId } })

    await Comment.findByIdAndDelete(commentId)

    res.end()
}))

module.exports = router