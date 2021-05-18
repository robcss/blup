import { createInputFieldObject } from "./InputField.js"

const ids = ["inputUsername", "inputPassword"]

const fields = createInputFieldObject(ids)

//specific validation logic for each field

fields.inputUsername.validate = fields.inputUsername.validateEmpty

fields.inputPassword.validate = fields.inputPassword.validateEmpty


export const getInputFieldArray = () => Object.values(fields)