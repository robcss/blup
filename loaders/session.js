const session = require('express-session')
const MongoStore = require('connect-mongo')

const { DB_URL, SESSION_SECRET, MONGOSTORE_SECRET } = require("../config")

const isEnvProduction = require("../utils/isEnvProduction")

const store = MongoStore.create({
    mongoUrl: DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: MONGOSTORE_SECRET
    }
})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: "session",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: isEnvProduction(),
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

module.exports = {
    session,
    sessionConfig
}