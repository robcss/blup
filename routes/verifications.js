const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn, isVerifiedByUser } = require("../middleware")

const Fountain = require("../models/fountain")



router.post("/", isLoggedIn({ isOut: "sendStatus" }), isVerifiedByUser, catchAsync(async (req, res) => {
    const fountainId = req.params.id

    const userId = req.user._id

    const fountain = await Fountain.findByIdAndUpdate(fountainId,
        {
            $inc: { verificationCount: 1 },
            $push: { verifications: userId }
        },
        { new: true })


    res.redirect(`/fountains/${fountainId}`)
}))


module.exports = router