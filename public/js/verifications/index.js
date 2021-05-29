import { postVerification } from "./postVerification.js"
import { deleteVerification } from "./deleteVerification.js"

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

        if (method === "POST") {
            await postVerification(uri, verifications)
            updateVerificationCount(1)
            changeButton(verifyButton, unverifyOpts)

        } else if (method === "DELETE") {
            await deleteVerification(uri)
            updateVerificationCount(-1)
            changeButton(verifyButton, verifyOpts)
        }

    } catch (e) {
        if (e.message === "401") {

            location.reload()
        }

        console.log(e.message)

    }

})


const changeButton = (button, { styleToRemove, styleToAdd, text, method }) => {
    button.classList.remove(styleToRemove)
    button.classList.add(styleToAdd)
    button.innerText = text
    button.setAttribute("data-method", method)
}

const updateVerificationCount = (inc) => {
    const button = document.getElementById("modal-launch_verifications")
    const progress = document.getElementById("progress_verifications")

    let verifCount = parseInt(button.innerText) + inc

    if (verifCount < 0) {
        verifCount = 0
    }

    button.innerText = verifCount
    progress.setAttribute("value", verifCount)
}