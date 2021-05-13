const Fountain = require("../models/fountain")
const Report = require("../models/report")

module.exports.createReport = async (req, res) => {
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
}

module.exports.updateReport = async (req, res) => {
    const { id, reportId } = req.params

    const userId = req.user._id

    const report = await Report.findByIdAndUpdate(reportId,
        {
            resolvedAuthor: userId,
            resolved: true
        },
        { new: true }).populate("author", "username").populate("resolvedAuthor", "username")


    await Fountain.findByIdAndUpdate(id, { $inc: { reportCount: -1 } })

    res.render("reports/resolved", { report })

}