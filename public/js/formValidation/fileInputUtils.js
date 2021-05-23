
import { formatBytes } from "../utils.js"


export const validateFiles = (fileArray, { maxCount, accept, maxSize }) => {
    try {
        if (maxCount) validateCount(fileArray, maxCount)
        if (accept) validateType(fileArray, accept)
        if (maxSize) validateSize(fileArray, maxSize)
    } catch (error) {
        return { result: false, message: error.message }
    }

    return { result: true, message: "Files are valid!" }
}


const validateCount = (fileArray, maxCount) => {
    if (fileArray.length > maxCount) {
        throw new Error(`You can upload a maximum of ${maxCount} files!`)
    }
    return true
}


const validateType = (fileArray, accept) => {
    const allowedTypes = accept.split(", ")
    if (!isEveryFileAllowed(fileArray, allowedTypes)) {
        throw new Error(`You can upload only ${accept} files!`)
    }
    return true
}

const validateSize = (fileArray, maxSize) => {
    if (!isEveryFileInSize(fileArray, maxSize)) {
        throw new Error(`You exceeded the maximum file size of ${formatBytes(maxSize)}`)
    }
    return true
}


export const resetFileInputAndAlert = (fileInput, text) => {
    resetFileInput(fileInput)
    alert(text)
    return
}

const resetFileInput = (fileInput) => {
    fileInput.value = null
    fileInput.dispatchEvent(new Event('change'))
}

const isEveryFileAllowed = (fileArray, allowedTypes) => {

    return fileArray.every(file => isFileTypeAllowed(file.type, allowedTypes))
}

const isFileTypeAllowed = (fileType, allowedTypes) => {

    return allowedTypes.some(type => fileType === type)
}

const isEveryFileInSize = (fileArray, maxSize) => {
    return fileArray.every(file => file.size <= maxSize)
}