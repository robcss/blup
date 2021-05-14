const ExpressError = require("../utils/ExpressError")

const { reportSchema } = require("../joiSchemas")

const ReportService = require("../services/ReportService")


module.exports.validateReport = (req, res, next) => {

    const reportBody = req.body

    const { error } = reportSchema.validate(reportBody);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


module.exports.isReportResolved = async (req, res, next) => {

    const { reportId } = req.params

    const reportIsResolved = await ReportService.isReportResolved(reportId)

    if (reportIsResolved) {

        req.flash('error', "This report is already marked as solved!");
        return res.status(401).send("")
    }

    next();
}