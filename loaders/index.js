require("./events")
const mongooseLoad = require("./mongoose")
const expressLoad = require("./express")

module.exports = (rootName) => {

    const db = mongooseLoad()
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Database connected");
    });

    const expressApp = expressLoad(rootName)
    console.log("Express loaded")
    return expressApp
}