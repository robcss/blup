const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { validateComment, isLoggedIn } = require("../middleware")

const Fountain = require("../models/fountain")
const Comment = require("../models/comment")


router.post("/", isLoggedIn({ isOut: "sendStatus" }), validateComment, catchAsync(async (req, res) => {
    const fountainId = req.params.id
    const commentBody = req.body

    const fountain = await Fountain.findById(fountainId)

    const newComment = new Comment({ body: commentBody })
    newComment.author = req.user._id;

    fountain.comments.push(newComment)

    await newComment.save()

    await fountain.save()

    const comment = await Comment.findById(newComment._id).populate('author')

    res.render("comments/showOne", { fountain, comment })
}))


router.delete("/:commentId", isLoggedIn({ isOut: "sendStatus" }), catchAsync(async (req, res) => {
    const { id, commentId } = req.params

    await Fountain.findByIdAndUpdate(id, { $pull: { comments: commentId } })

    await Comment.findByIdAndDelete(commentId)

    res.end()
}))

module.exports = router