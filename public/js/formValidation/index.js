const form = document.getElementById("form-to-validate")
const sumbitButton = document.getElementById("submitButton")

let inputFields = []

const setInputFields = async () => {
    const getterName = form.getAttribute("data-fieldsGetter")
    const getter = await import(`./inputFields_${getterName}`)

    inputFields = getter.getInputFields()
}

setInputFields()


//change event logic
document.addEventListener('change', event => {

    if (submitButton.disabled) {

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

//reset event logic

form.addEventListener('reset', event => {

    resetAllFields()
    disableButton()

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

const resetAllFields = () => inputFields.forEach(field => field.reset())


// submit button functions
const disableButton = () => {
    submitButton.disabled = true;
    submitButton.setAttribute("disabled", "true");
}

const enableButton = () => {
    submitButton.disabled = false;
    submitButton.removeAttribute("disabled");
}





