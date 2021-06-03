const { cloudinary } = require("../loaders/cloudinary")

module.exports = async () => {
    const result = await cloudinary.search.expression('Blup/seeds').sort_by('public_id', 'desc').execute()
    const images = result.resources.map(resource => ({ url: resource.secure_url, filename: resource.public_id }))

    return images
}