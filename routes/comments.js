const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { validateComment, isLoggedIn, isCommentAuthor } = require("../middleware")

const comments = require("../controllers/comments-controller")


router.post("/", isLoggedIn({ isOut: "sendStatus" }), validateComment, catchAsync(comments.createComment))

router.delete("/:commentId", isLoggedIn({ isOut: "sendStatus" }), isCommentAuthor, catchAsync(comments.deleteComment))

module.exports = router