const FountainService = require("../services/FountainService")

module.exports.createVerification = async (req, res) => {
    const fountainId = req.params.id
    const userId = req.user._id

    const fountain = await FountainService.addVerification(fountainId, userId)

    res.render("verifications/index", { fountain })
}

module.exports.deleteVerification = async (req, res) => {
    const fountainId = req.params.id
    const userId = req.user._id

    const fountain = await FountainService.removeVerification(fountainId, userId)

    res.render("verifications/index", { fountain })
}