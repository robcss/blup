require('dotenv').config()

const DB_URL = 'mongodb://localhost:27017/fountain-finder'
// const DB_URL = process.env.DB_URL

module.exports = {

    NODE_ENV: process.env.NODE_ENV,

    PORT: process.env.PORT || 3100,

    MULTER_MAX_COUNT: 5,
    MULTER_MAX_SIZE: 5 * 1024 * 1024,// 10MB

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,

    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,

    DB_URL,

    SESSION_SECRET: process.env.SESSION_SECRET,
    MONGOSTORE_SECRET: process.env.MONGOSTORE_SECRET
}