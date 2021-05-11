const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn, validateReport, isResolved } = require("../middleware")

const Fountain = require("../models/fountain")
const Report = require("../models/report")


router.post("/", isLoggedIn({ isOut: "sendStatus" }), validateReport, catchAsync(async (req, res) => {
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

    res.render("reports/showOne", { fountain, report })
}))


router.patch("/:reportId", isLoggedIn({ isOut: "sendStatus" }), catchAsync(isResolved), catchAsync(async (req, res) => {
    const { id, reportId } = req.params

    const userId = req.user._id

    const report = await Report.findByIdAndUpdate(reportId,
        { resolvedAuthor: userId },
        { new: true }).populate("author", "username").populate("resolvedAuthor", "username")

    await Fountain.findByIdAndUpdate(id, { $inc: { reportCount: -1 } })

    res.render("reports/solved", { report })

}))

module.exports = router