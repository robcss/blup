const FountainService = require("../services/FountainService")
const GeocoderService = require("../services/GeocoderService")

module.exports.showIndex = async (req, res) => {
    const fountains = await FountainService.getAllFountains()
    res.render("fountains/index", { fountains })
}

module.exports.renderNewForm = (req, res) => {
    res.render("fountains/new")
}

module.exports.createFountain = async (req, res) => {
    const { address } = req.body

    const geoData = await GeocoderService.geocodeFromAddress(address)
    const geometry = GeocoderService.getGeometry(geoData)

    const author = req.user._id
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }))

    const newFountain = await FountainService.createFountain({ address, geometry, author, images })

    req.flash('success', 'Fountain added!')
    res.redirect(`/fountains/${newFountain._id}`)
}

module.exports.showFountain = async (req, res) => {
    const { id } = req.params

    const fountain = await FountainService.getFountainComplete(id)

    if (!fountain) {
        req.flash("error", "Can't find this fountain!")
        return res.redirect("/fountains")
    }

    let fountainIsVerifiedByUser = false

    if (req.isAuthenticated()) {
        const userId = req.user._id

        fountainIsVerifiedByUser = await FountainService.isFountainVerifiedByUser(id, userId)
    }

    res.render("fountains/show", { fountain, fountainIsVerifiedByUser })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params

    const fountain = await FountainService.getFountain(id)

    if (!fountain) {
        req.flash("error", "Can't find this fountain!")
        return res.redirect("/fountains")
    }

    res.render("fountains/edit", { fountain })
}

module.exports.updateFountain = async (req, res) => {
    const { id } = req.params
    const { address, deleteImages } = req.body

    const geoData = await GeocoderService.geocodeFromAddress(address)
    const geometry = GeocoderService.getGeometry(geoData)

    const images = req.files.map(f => ({ url: f.path, filename: f.filename }))

    const fountain = await FountainService.updateFountain(id, { address, geometry }, images, deleteImages)

    req.flash('success', 'Fountain successfully updated!')
    res.redirect(`/fountains/${fountain._id}`)
}

module.exports.deleteFountain = async (req, res) => {
    const { id } = req.params

    await FountainService.deleteFountain(id)

    req.flash('success', 'Fountain successfully deleted!')
    res.redirect("/fountains")
}