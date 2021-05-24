const eventBus = require("../loaders/eventBus")

eventBus.receive("fountain_imagesDeleted", async (event) => {

    eventBus.log(event)

    const imagesNames = event.payload

    console.log(imagesNames)

})


eventBus.on('error', console.log)