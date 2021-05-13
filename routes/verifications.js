const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn, isVerifiedByCurrentUser } = require("../middleware")

const verifications = require("../controllers/verifications-controller")

router.route("/")
    .post(isLoggedIn({ isOut: "sendStatus" }), catchAsync(isVerifiedByCurrentUser), catchAsync(verifications.createVerification))
    .delete(isLoggedIn({ isOut: "sendStatus" }), catchAsync(isVerifiedByCurrentUser), catchAsync(verifications.deleteVerification))

module.exports = router