document.addEventListener('DOMContentLoaded', () => {

    const fileElements = document.querySelectorAll('.file')

    if (!fileElements.length) return

    fileElements.forEach(retrieveFileNames)
});

const retrieveFileNames = (fileElement) => {

    const fileInput = fileElement.querySelector("input[type=file]")
    const fileName = fileElement.querySelector('.file-name');

    if (!fileInput || !fileName) return

    fileInput.addEventListener("change", event => {

        fileName.innerText = ""

        const files = fileInput.files

        if (files.length < 1) return

        for (let i = 0; i < files.length; i++) {

            const name = files[i].name

            const separator = i > 0 ? ", " : ""

            fileName.innerText += separator + name
        }
    })

}