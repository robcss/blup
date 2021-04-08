import { createInputField } from "./InputField.js"

const [inputStreet, inputNumber, inputCity, inputPostcode, inputCountry] =
    ["inputStreet", "inputNumber", "inputCity", "inputPostcode", "inputCountry"].map(id => createInputField(id))

//specific validation logic for each field
inputStreet.validate = function () {
    if (this.isNotEmpty) {
        const regex = /^\b[a-zA-Z]+\b\s(\b[a-zA-Z]+\b\s?)+/g; // at least two words(letters only) separated by single spaces

        const match = this.inputElement.value.match(regex)

        const regexTest = match ? match[0] === this.inputElement.value : false //check if all input matches

        if (regexTest) {
            this.setSuccess()
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


inputCity.validate = function () {
    if (this.isNotEmpty) {
        const regex = /^([a-zA-Z]+\s{0,1})+/g; // one word(letters only) or more separated by single spaces

        const match = this.inputElement.value.match(regex)

        const regexTest = match ? match[0] === this.inputElement.value : false //check if all input matches

        if (regexTest) {
            this.setSuccess()
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


const checkIfNumber = (name) => function () {
    if (this.isNotEmpty) {

        const regex = /^\d+$/g
        const regexTest = regex.test(this.inputElement.value)

        if (regexTest) {
            this.setSuccess()
            this.validated = true
        } else {
            this.setDanger(`${name} must be a single integer`)
            this.validated = false
        }
    } else {
        this.setDanger("Field is required")
        this.validated = false
    }
}


inputNumber.validate = checkIfNumber("Number")

inputPostcode.validate = checkIfNumber("Postcode")

inputCountry.validate = inputCountry.validateEmpty


export const getInputFields = () => [inputStreet, inputNumber, inputCity, inputPostcode, inputCountry]