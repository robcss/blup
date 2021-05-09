
const postReportButton = document.getElementById("submitButton")

const reports = document.getElementById("reports")

const modalClose = document.getElementById("modal_reports").querySelector(".modal-close")

const reportsTab = document.getElementById("tab_reports").querySelector("a")

postReportButton.addEventListener("click", event => {
    event.preventDefault()
})

postReportButton.addEventListener("mouseup", async event => {


    postReportButton.blur()


    try {

        const reportForm = document.getElementById("form-to-validate")

        await postReport(reportForm, reports)

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

const postReport = async (form) => {

    const formData = new FormData(form)

    const body = new URLSearchParams(formData)

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    }

    const uri = form.getAttribute("data-uri")

    const res = await fetch(uri, options)

    if (!res.ok) {
        throw new Error(res.status)
    }

    const resText = await res.text()

    reports.innerHTML += resText

}