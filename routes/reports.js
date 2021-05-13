const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync")

const { isLoggedIn, validateReport, isResolved } = require("../middleware")

const reports = require("../controllers/reports-controller")

router.post("/", isLoggedIn({ isOut: "sendStatus" }), validateReport, catchAsync(reports.createReport))

router.patch("/:reportId", isLoggedIn({ isOut: "sendStatus" }), catchAsync(isResolved), catchAsync(reports.updateReport))

module.exports = router