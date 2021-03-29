import { inputFields } from "./inputFields.js"


// submit button logic
const sumbitButton = document.getElementById("submitButton")

const disableSubmit = () => {
    sumbitButton.disabled = true;
    sumbitButton.setAttribute("disabled", "true");
}

const activateSubmit = () => {
    sumbitButton.disabled = false;
    sumbitButton.removeAttribute("disabled");
}

const checkIfAllValid = (inputFields) => inputFields.every(field => field.isValid)

const tryActivateSumbit = (inputFields) => {

    const allAreValid = checkIfAllValid(inputFields)

    if (allAreValid) {
        activateSubmit()
    } else {
        disableSubmit()
    }
}

//validation
document.addEventListener('change', event => {

    for (let field of inputFields) {
        if (event.target.id === field.id) {

            field.validate()

            if (field.isValid) {
                tryActivateSumbit(inputFields)
            } else {
                disableSubmit()
            }

            return
        }
    }

}, false)