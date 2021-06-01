require('dotenv').config()

module.exports = {

    NODE_ENV: process.env.NODE_ENV,

    MULTER_MAX_COUNT: 5,
    MULTER_MAX_SIZE: 5 * 1024 * 1024,// 10MB

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,

    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
}