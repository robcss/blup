const Fountain = require("../models/fountain")

module.exports.createVerification = async (req, res) => {
    const fountainId = req.params.id

    const userId = req.user._id

    const fountain = await Fountain.findByIdAndUpdate(fountainId,
        {
            $inc: { verificationCount: 1 },
            $push: { verifications: userId }
        },
        { new: true }).populate("verifications", "username")

    res.render("verifications/index", { fountain })
}

module.exports.deleteVerification = async (req, res) => {
    const fountainId = req.params.id

    const userId = req.user._id

    const fountain = await Fountain.findByIdAndUpdate(fountainId,
        {
            $inc: { verificationCount: -1 },
            $pull: { verifications: userId }
        },
        { new: true }).populate("verifications", "username")


    res.render("verifications/index", { fountain })
}