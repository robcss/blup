import { createInputFieldObject } from "./InputField.js"

const ids = ["inputUsername", "inputEmail", "inputPassword"]

const fields = createInputFieldObject(ids)

//specific validation logic for each field

fields.inputUsername.validate = fields.inputUsername.validateEmpty

fields.inputEmail.validate = fields.inputEmail.validateEmpty

fields.inputPassword.validate = fields.inputPassword.validateEmpty

export const getInputFieldArray = () => Object.values(fields)