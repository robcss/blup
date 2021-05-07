
const verifyButtonContainer = document.getElementById("verifyButtonContainer")

const verifyButton = verifyButtonContainer.getElementsByTagName("button")[0]

const verifications = document.getElementById("verifications")

const verifyOpts = {
    styleToRemove: "is-danger",
    styleToAdd: "is-success",
    text: "Verify",
    method: "POST"
}

const unverifyOpts = {
    styleToRemove: "is-success",
    styleToAdd: "is-danger",
    text: "Unverify",
    method: "DELETE"
}


verifyButton.addEventListener("click", event => {
    event.preventDefault()
})

verifyButton.addEventListener("mouseup", async event => {

    verifyButton.blur()

    const method = verifyButton.getAttribute("data-method")
    const uri = verifyButtonContainer.getAttribute("data-uri")

    try {

        const updatedVerifications = await fetchVerification(method, uri)

        verifications.innerHTML = updatedVerifications

        setButtonState(verifyButton, method)



    } catch (e) {
        if (e.message === "401") {

            location.reload()
        }

        console.log(e.message)

    }

})


const fetchVerification = async (method, uri) => {

    const options = {
        method,
        headers: {
            'Content-Type': 'text/plain'
        },
        body: method
    }

    const res = await fetch(uri, options)

    if (!res.ok) {
        throw new Error(res.status)
    }

    const resText = await res.text()

    return resText
}

const setButtonState = (button, method) => {
    if (method === "POST") {
        changeButton(button, unverifyOpts)

    } else if (method === "DELETE") {
        changeButton(button, verifyOpts)
    }
}

const changeButton = (button, { styleToRemove, styleToAdd, text, method }) => {
    button.classList.remove(styleToRemove)
    button.classList.add(styleToAdd)
    button.innerText = text
    button.setAttribute("data-method", method)
}
