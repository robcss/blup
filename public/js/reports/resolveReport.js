import { getElemIdPostfix } from "../utils.js"

export const resolveReport = async (resolveReportButton) => {

    const uri = resolveReportButton.getAttribute("data-uri")

    const res = await fetch(uri, { method: "PATCH" })

    if (!res.ok) {
        throw new Error(res.status)
    }

    const resText = await res.text()

    const reportId = getElemIdPostfix(resolveReportButton)

    const report = document.getElementById(`report_${reportId}`)

    report.innerHTML = resText
}