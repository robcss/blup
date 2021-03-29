import { inputFields } from "./inputFields.js"

const form = document.getElementById("form-to-validate")
const sumbitButton = document.getElementById("submitButton")

//change event logic
document.addEventListener('change', event => {

    if (sumbitButton.disabled) {

        const changedField = findField(event.target.id)

        if (changedField) {
            changedField.validate()
            tryEnablingButton()
        }

    } else {
        validateAllFields()
        tryEnablingButton()
    }

}, false)

//submit event logic

form.addEventListener('submit', event => {
    event.preventDefault();

    validateAllFields()

    if (everyFieldIsValid()) {
        form.submit()
    } else {
        disableButton()
    }
});

//change event functions
const tryEnablingButton = () => {
    if (everyFieldIsValid()) {
        enableButton()
    } else {
        disableButton()
    }
}

//fields validation functions
const findField = (id) => inputFields.find(field => field.id === id)

const validateAllFields = () => inputFields.forEach(field => field.validate())

const everyFieldIsValid = () => inputFields.every(field => field.isValid)


// submit button functions
const disableButton = () => {
    sumbitButton.disabled = true;
    sumbitButton.setAttribute("disabled", "true");
}

const enableButton = () => {
    sumbitButton.disabled = false;
    sumbitButton.removeAttribute("disabled");
}





