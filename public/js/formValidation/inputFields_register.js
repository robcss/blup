import { createInputField } from "./InputField.js"

const [inputUsername, inputEmail, inputPassword] =
    ["inputUsername", "inputEmail", "inputPassword"].map(id => createInputField(id))

//specific validation logic for each field

inputUsername.validate = inputUsername.validateEmpty

inputEmail.validate = inputEmail.validateEmpty

inputPassword.validate = inputPassword.validateEmpty


export const getInputFields = () => [inputUsername, inputEmail, inputPassword]