document.addEventListener('DOMContentLoaded', () => {

    const launchButtons = document.querySelectorAll("[id^='modal-launch_']")

    if (!launchButtons.length) return

    launchButtons.forEach(handleModal)
});


const handleModal = (launchButton) => {

    const modalRef = launchButton.id.split("modal-launch_")[1]
    const modal = document.getElementById(`modal_${modalRef}`)

    if (!modal) return

    const modalBackground = modal.querySelector(".modal-background")
    const modalClose = modal.querySelector(".modal-close")


    launchButton.addEventListener("click", event => {
        event.preventDefault()

        modal.classList.add("is-active")
    })

    modalBackground.addEventListener("click", event => {
        event.preventDefault()

        modal.classList.remove("is-active")
    })

    modalClose.addEventListener("click", event => {
        event.preventDefault()

        modal.classList.remove("is-active")
    })
}


const getModalRef = tab => tab.id.split("tab_")[1]