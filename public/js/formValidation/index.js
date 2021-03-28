import { InputField } from "./InputField.js"

const createInputField = (id) => {
    return new InputField(id)
}



const [inputStreet, inputNumber, inputCity] = ["inputStreet", "inputNumber", "inputCity"].map(id => createInputField(id))


inputStreet.validate = function () {
    if (this.isNotEmpty) {
        const regex = /^\b[a-zA-Z]+\b\s(\b[a-zA-Z]+\b\s?)+/g; // at least two words(letters only) separated by single spaces

        const match = this.inputElement.value.match(regex)

        const regexTest = match ? match[0] === this.inputElement.value : false //check if all input matches

        if (regexTest) {
            this.setSuccess("Street is valid")
            this.validated = true
        } else {
            this.setDanger("Invalid street name")
            this.validated = false
        }
    } else {
        this.setDanger("Field is required")
        this.validated = false
    }
}

inputNumber.validate = function () {
    if (this.isNotEmpty) {

        const regex = /^\d+$/g
        const regexTest = regex.test(this.inputElement.value)

        if (regexTest) {
            this.setSuccess("Number is valid")
            this.validated = true
        } else {
            this.setDanger("Number must be a single integer")
            this.validated = false
        }
    } else {
        this.setDanger("Field is required")
        this.validated = false
    }
}

inputCity.validate = function () {
    if (this.isNotEmpty) {
        const regex = /^([a-zA-Z]+\s{0,1})+/g; // one word(letters only) or more separated by single spaces

        const match = this.inputElement.value.match(regex)

        const regexTest = match ? match[0] === this.inputElement.value : false //check if all input matches

        if (regexTest) {
            this.setSuccess("City is valid")
            this.validated = true
        } else {
            this.setDanger("Invalid city name")
            this.validated = false
        }
    } else {
        this.setDanger("Field is required")
        this.validated = false
    }
}



const fields = [inputStreet, inputNumber, inputCity]


document.addEventListener('change', event => {

    for (let field of fields) {
        if (event.target.id === field.id) {
            field.validate()
            console.log(field.isValid)
            return
        }
    }



}, false)