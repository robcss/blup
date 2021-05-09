const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn } = require("../middleware")

const Fountain = require("../models/fountain")
const Report = require("../models/report")


router.post("/", isLoggedIn({ isOut: "sendStatus" }), catchAsync(async (req, res) => {
    const fountainId = req.params.id
    const reportBody = req.body

    const newReport = new Report({ ...reportBody, author: req.user._id })

    const fountain = await Fountain.findByIdAndUpdate(fountainId,
        {
            $inc: { reportCount: 1 },
            $push: { reports: newReport._id }
        },
        { new: true })

    await newReport.save()

    const report = await Report.findById(newReport._id).populate('author')

    res.render("reports/showOne", { report })
}))

module.exports = router