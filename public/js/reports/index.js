import { postReport } from "./postReport.js"
import { resolveReport } from "./resolveReport.js"
import { elemIdPrefixMatches } from "../utils.js"

const reports = document.getElementById("reports")

const postReportButton = document.getElementById("submitButton")
const modalClose = document.getElementById("modal_reports").querySelector(".modal-close")
const reportsTab = document.getElementById("tab_reports").querySelector("a")



//post report events
postReportButton.addEventListener("click", event => {
    event.preventDefault()
})

postReportButton.addEventListener("mouseup", async event => {


    postReportButton.blur()


    try {

        const reportForm = document.getElementById("form-to-validate")

        await postReport(reportForm, reports)

        updateReportCount(1)

        reportForm.reset()

        modalClose.click()

        reportsTab.click()



    } catch (e) {
        if (e.message === "401") {

            location.reload()
        }

        console.log(e.message)

    }

})

//resolve report events
reports.addEventListener("click", async event => {

    const isResolveButton = elemIdPrefixMatches(event.target, "resolveReportButton_")

    if (isResolveButton) {

        const resolveReportButton = event.target

        try {
            await resolveReport(resolveReportButton)

            updateReportCount(-1)

        } catch (e) {

            if (e.message === "401") {

                location.reload()
            }

            console.log(e.message)
        }
    }

})



const updateReportCount = (inc) => {

    const tag = document.getElementById("tag_reportCount")
    const anchor = document.getElementById("tab_reports").querySelector("a")

    if (!tag && inc < 1) return

    if (!tag) {
        const span = document.createElement("span")
        span.innerText = inc
        span.classList.add("ml-2", "tag", "is-warning", "is-rounded")
        span.id = "tag_reportCount"
        anchor.appendChild(span)
        return
    }

    const reportCount = parseInt(tag.innerText) + inc

    if (reportCount < 1) {
        tag.remove()
    } else {
        tag.innerText = reportCount
    }

}

