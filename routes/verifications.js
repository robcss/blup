const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const isUserLoggedIn = require("../middleware/isUserLoggedIn")
const { hasUserVerifiedFountain } = require("../middleware/fountains-middleware")

const verifications = require("../controllers/verifications-controller")

router.route("/")
    .post(isUserLoggedIn({ isOut: "sendStatus" }), catchAsync(hasUserVerifiedFountain), catchAsync(verifications.createVerification))
    .delete(isUserLoggedIn({ isOut: "sendStatus" }), catchAsync(hasUserVerifiedFountain), catchAsync(verifications.deleteVerification))

module.exports = router