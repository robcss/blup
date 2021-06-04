require('dotenv').config()


module.exports = {

    NODE_ENV: process.env.NODE_ENV,

    PORT: process.env.PORT || 3100,

    MULTER_MAX_COUNT: 5,
    MULTER_MAX_SIZE: 5 * 1024 * 1024,// 10MB

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,

    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,

    DB_URL: process.env.NODE_ENV === "production" ? process.env.DB_URL : 'mongodb://localhost:27017/fountain-finder',

    SESSION_SECRET: process.env.SESSION_SECRET,
    MONGOSTORE_SECRET: process.env.MONGOSTORE_SECRET
}