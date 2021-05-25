const eventBus = require("../loaders/eventBus")
const FileStorageService = require("../services/FileStorageService")

eventBus.receive("fountain_imagesDeleted", async (event) => {

    eventBus.log(event)

    const imagesNames = event.payload

    try {
        await FileStorageService.destroyMany(imagesNames)
    } catch (error) {
        console.log(error)
        //retry logic
    }

})


eventBus.receive("fountain_deleted", async (event) => {

    eventBus.log(event)

    const deletedFountain = event.payload

    if (deletedFountain.images.length < 1) return

    const imagesNames = deletedFountain.images.map(img => img.filename)

    try {
        await FileStorageService.destroyMany(imagesNames)
    } catch (error) {
        console.log(error)
        //retry logic
    }

})


eventBus.on('error', console.log)