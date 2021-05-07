const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn, isVerifiedByCurrentUser } = require("../middleware")

const Fountain = require("../models/fountain")



router.post("/", isLoggedIn({ isOut: "sendStatus" }), catchAsync(isVerifiedByCurrentUser), catchAsync(async (req, res) => {
    const fountainId = req.params.id

    const userId = req.user._id

    const fountain = await Fountain.findByIdAndUpdate(fountainId,
        {
            $inc: { verificationCount: 1 },
            $push: { verifications: userId }
        },
        { new: true }).populate("verifications", "username")

    res.render("verifications/show", { fountain })
}))


router.delete("/", isLoggedIn({ isOut: "sendStatus" }), catchAsync(isVerifiedByCurrentUser), catchAsync(async (req, res) => {
    const fountainId = req.params.id

    const userId = req.user._id

    const fountain = await Fountain.findByIdAndUpdate(fountainId,
        {
            $inc: { verificationCount: -1 },
            $pull: { verifications: userId }
        },
        { new: true }).populate("verifications", "username")


    res.render("verifications/show", { fountain })
}))

module.exports = router