import { createInputFieldObject } from "./InputField.js"
import { validateFiles, resetFileInputAndAlert } from "./fileInputUtils.js"

const ids = ["inputStreet", "inputNumber", "inputCity", "inputPostcode", "inputCountry", "inputImage"]

const fields = createInputFieldObject(ids)

fields.inputStreet.validate = function () {
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


fields.inputCity.validate = function () {
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


fields.inputNumber.validate = checkIfNumber("Number")

fields.inputPostcode.validate = checkIfNumber("Postcode")

fields.inputCountry.validate = fields.inputCountry.validateEmpty


fields.inputImage.validated = true // validated by default

fields.inputImage.validate = function () {
    const input = this.inputElement
    const files = input.files

    const fileArray = Array.from(files)

    if (files.length < 1) {
        this.validated = true
        return
    }

    const maxCount = parseInt(input.getAttribute("data-maxCount"))
    const accept = input.getAttribute("accept")
    const maxSize = parseInt(input.getAttribute("data-maxSize"))


    const filesValidation = validateFiles(fileArray, { maxCount, accept, maxSize })

    if (!filesValidation.result) {
        resetFileInputAndAlert(input, filesValidation.message)
        return
    }

    this.validated = true
}



export const getInputFieldArray = () => Object.values(fields)