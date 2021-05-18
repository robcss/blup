require('dotenv').config()

module.exports = {
    MULTER_MAX_COUNT: 5,
    MULTER_MAX_SIZE: 5 * 1024 * 1024,// 10MB

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
}