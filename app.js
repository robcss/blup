const expressApp = require("./loaders")(__dirname)

const port = 3100

expressApp.listen(port, () => {
    console.log(`Serving on port ${port}`)
})