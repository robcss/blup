export const postReport = async (form, reports) => {

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