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
    console.log(allAreValid)
    if (allAreValid) {
        activateSubmit()
    } else {
        disableSubmit()
    }
}

//fields validation and submit button activation
document.addEventListener('change', event => {

    if (sumbitButton.disabled) {
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
    } else {
        inputFields.map(f => f.validate())
        tryActivateSumbit(inputFields)
    }

}, false)

//validation on submit event
const form = document.getElementById("form-to-validate")

form.addEventListener('submit', event => {
    event.preventDefault();

    inputFields.map(f => f.validate())

    if (checkIfAllValid(inputFields)) {
        form.submit()
    } else {
        disableSubmit()
    }
});