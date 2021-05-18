import { createInputFieldObject } from "./InputField.js"

const ids = ["inputTitle", "inputDescription"]

const fields = createInputFieldObject(ids)

//specific validation logic for each field

fields.inputTitle.validate = fields.inputTitle.validateEmpty

fields.inputDescription.validate = fields.inputDescription.validateEmpty


export const getInputFieldArray = () => Object.values(fields)