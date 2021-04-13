import { createInputField } from "./InputField.js"

const [inputUsername, inputPassword] =
    ["inputUsername", "inputPassword"].map(id => createInputField(id))

//specific validation logic for each field

inputUsername.validate = inputUsername.validateEmpty

inputPassword.validate = inputPassword.validateEmpty


export const getInputFields = () => [inputUsername, inputPassword]