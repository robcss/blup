const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const isUserLoggedIn = require("../middleware/isUserLoggedIn")
const { validateComment, isUserCommentAuthor } = require("../middleware/comments-middleware")

const comments = require("../controllers/comments-controller")


router.post("/", isUserLoggedIn({ isOut: "sendStatus" }), validateComment, catchAsync(comments.createComment))

router.delete("/:commentId", isUserLoggedIn({ isOut: "sendStatus" }), isUserCommentAuthor, catchAsync(comments.deleteComment))

module.exports = router