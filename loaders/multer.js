const multer = require("multer")

const allowed = ["image/png", "image/jpg", "image/jpeg"]

const fileFilter = (req, file, cb) => {

    const isAllowed = allowed.some(type => file.mimetype === type)

    if (isAllowed) {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error(`${file.mimetype} is not an allowed format!`))
    }
}


const { MULTER_MAX_SIZE } = require("../config/index")

const limits = { fileSize: MULTER_MAX_SIZE }

const upload = multer({ dest: 'uploads/', fileFilter, limits })

module.exports = {
    multer,
    upload
}