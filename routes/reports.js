const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const isUserLoggedIn = require("../middleware/isUserLoggedIn")
const { validateReport, isReportResolved } = require("../middleware/reports-middleware")

const reports = require("../controllers/reports-controller")

router.post("/", isUserLoggedIn({ isOut: "sendStatus" }), validateReport, catchAsync(reports.createReport))

router.patch("/:reportId", isUserLoggedIn({ isOut: "sendStatus" }), catchAsync(isReportResolved), catchAsync(reports.updateReport))

module.exports = router