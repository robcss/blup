const FountainService = require("../services/FountainService")

module.exports.createVerification = async (req, res) => {
    const fountainId = req.params.id
    const userId = req.user._id

    const fountain = await FountainService.addVerification(fountainId, userId)

    const verification = fountain.verifications[fountain.verifications.length - 1]

    res.render("verifications/showOne", { verification })
}

module.exports.deleteVerification = async (req, res) => {
    const fountainId = req.params.id
    const userId = req.user._id

    await FountainService.removeVerification(fountainId, userId)

    res.send(userId)
}