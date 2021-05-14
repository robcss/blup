const Report = require("../models/report")

class ReportService {

    async getReport(id) {
        const report = await Report.findById(id)
        return report
    }

    async getCompleteReport(id) {
        const report = await Report.findById(id).populate('author')
        return report
    }

    async createReport(data) {
        const newReport = new Report(data)
        await newReport.save()
        return newReport
    }

    async deleteReport(id) {
        await Report.findByIdAndDelete(id)
    }

    async resolveReport(id, userId) {
        const report = await Report.findByIdAndUpdate(id,
            {
                resolvedAuthor: userId,
                resolved: true
            },
            { new: true }).populate("author", "username").populate("resolvedAuthor", "username")

        return report
    }

    async isReportResolved(id) {
        const report = await this.getReport(id)
        return report.resolved
    }

}

module.exports = new ReportService