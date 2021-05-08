import { createInputField } from "./InputField.js"

const [inputTitle, inputDescription] =
    ["inputTitle", "inputDescription"].map(id => createInputField(id))

//specific validation logic for each field

inputTitle.validate = inputTitle.validateEmpty

inputDescription.validate = inputDescription.validateEmpty


export const getInputFields = () => [inputTitle, inputDescription]