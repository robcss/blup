
import { formatBytes } from "../utils.js"


export const validateFiles = (fileInput, fileArray, { maxCount, accept, maxSize }) => {
    const passCount = validateCount(fileInput, fileArray, maxCount)
    const passType = validateType(fileInput, fileArray, accept)
    const passSize = validateSize(fileInput, fileArray, maxSize)

    return passCount && passType && passSize
}

const validateCount = (fileInput, fileArray, maxCount) => {
    if (!maxCount) return true
    if (fileArray.length > maxCount) {
        resetAndAlert(fileInput, `You can upload a maximum of ${maxCount} files!`)
        return false
    }
    return true
}

const validateType = (fileInput, fileArray, accept) => {
    if (!accept) return true
    const allowedTypes = accept.split(", ")
    if (!isEveryFileAllowed(fileArray, allowedTypes)) {
        resetAndAlert(fileInput, `You can upload only ${accept} files!`)
        return false
    }
    return true
}

const validateSize = (fileInput, fileArray, maxSize) => {
    if (!maxSize) return true
    if (!isEveryFileInSize(fileArray, maxSize)) {
        resetAndAlert(fileInput, `You exceeded the maximum file size of ${formatBytes(maxSize)}`)
        return false
    }
    return true
}


const resetAndAlert = (fileInput, text) => {
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

const isEveryFileInSize = (fileArray, maxSize) => fileArray.every(file => file.size <= maxSize)