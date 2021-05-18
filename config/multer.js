

const allowed = ["image/png", "image/jpg", "image/jpeg"]

module.exports.fileFilter = (req, file, cb) => {

    const isAllowed = allowed.some(type => file.mimetype === type)

    if (isAllowed) {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error(`${file.mimetype} is not an allowed format!`))
    }
}


const maxSize = 10 * 1024 * 1024; // 10MB

module.exports.limits = { fileSize: maxSize }