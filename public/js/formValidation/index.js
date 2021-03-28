import { InputField } from "./InputField.js"


const inputStreet = new InputField("inputStreet")

inputStreet.validate = function () {
    if (this.isNotEmpty) {
        const regex = /^\b[a-zA-Z]+\b\s(\b[a-zA-Z]+\b\s?)+/g; // at least two words(letters only) separated by space

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




document.addEventListener('change', event => {

    if (event.target.id === inputStreet.id) {
        inputStreet.validate()
        console.log(inputStreet.isValid)
    }

}, false)