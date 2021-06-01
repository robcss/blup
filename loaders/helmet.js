const { CLOUDINARY_CLOUD_NAME } = require("../config")
const helmet = require('helmet')

const scriptSrcUrls = [
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/"
]

const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://use.fontawesome.com/"
]

const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://ka-f.fontawesome.com/"
]

const fontSrcUrls = ["https://ka-f.fontawesome.com/"];

const contentSecurityPolicyOpts = {
    directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/`,
            "https://bulma.io/"
        ],
        fontSrc: ["'self'", ...fontSrcUrls],
    },
}

module.exports = {
    helmet,
    contentSecurityPolicyOpts
}

