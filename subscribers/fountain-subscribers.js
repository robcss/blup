const eventBus = require("../loaders/eventBus")

eventBus.on("fountain_imagesDeleted", (deleteImages) => {

    console.log(deleteImages)
})


eventBus.on('error', console.log)