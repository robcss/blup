const expressApp = require("./loaders")(__dirname)

const { PORT } = require("./config")

expressApp.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
})