document.addEventListener('DOMContentLoaded', () => {

    const tabGroups = document.querySelectorAll('.tabs')

    if (!tabGroups.length) return

    tabGroups.forEach(changeTab)
});

const changeTab = (tabGroup) => {
    tabGroup.addEventListener("click", event => {

        const clickedTab = event.target.parentNode

        if (!clickedTab.id.startsWith("tab_")) return

        activateTab(clickedTab)

        const tabs = tabGroup.querySelectorAll("[id^='tab_']")

        tabs.forEach(tab => {

            if (getTabRef(tab) !== getTabRef(clickedTab)) {
                dectivateTab(tab)
            }

        })

    })
}

const activateTab = (tab) => {
    tab.classList.add("is-active")

    const tabContent = getTabContent(getTabRef(tab))

    if (tabContent) tabContent.classList.remove("is-hidden")
}

const dectivateTab = (tab) => {
    tab.classList.remove("is-active")

    const tabContent = getTabContent(getTabRef(tab))

    if (tabContent) tabContent.classList.add("is-hidden")
}


const getTabRef = tab => tab.id.split("tab_")[1]

const getTabContent = tabRef => document.getElementById(`tabContent_${tabRef}`)
