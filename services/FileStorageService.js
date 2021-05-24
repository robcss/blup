const { cloudinary } = require("../loaders/cloudinary")

class FileStorageService {
    async destroyOne(filename) {
        await cloudinary.uploader.destroy(filename);
    }

    async destroyMany(filenamesArray) {
        for (let filename of filenamesArray) {
            await this.destroyOne(filename)
        }
    }
}

module.exports = new FileStorageService