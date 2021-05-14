const ReportService = require("../services/ReportService")
const FountainService = require("../services/FountainService")

module.exports.createReport = async (req, res) => {
    const fountainId = req.params.id
    const reportBody = req.body
    const userId = req.user._id

    const newReport = await ReportService.createReport({ ...reportBody, author: userId })

    let fountain;

    try {

        fountain = await FountainService.addReport(fountainId, newReport._id)

    } catch (error) {

        await ReportService.deleteReport(newReport._id)

        req.flash('error', 'Could not add report!');
        return res.status(401).send("")
    }

    const report = await ReportService.getCompleteReport(newReport._id)

    res.render("reports/showOne", { fountain, report })
}

module.exports.updateReport = async (req, res) => {
    const { id, reportId } = req.params
    const userId = req.user._id

    const report = await ReportService.resolveReport(reportId, userId)

    await FountainService.decreaseReportCount(id)

    res.render("reports/resolved", { report })

}