const ExpressError = require("../utils/ExpressError")

const { addressSchema } = require("../joiSchemas")

const FountainService = require("../services/FountainService")

module.exports.validateFountain = (req, res, next) => {

    const { address } = req.body

    const { error } = addressSchema.validate(address);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isUserFountainAuthor = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id

    const userIsFountainAuthor = await FountainService.isFountainCreatedByUser(id, userId)

    if (!userIsFountainAuthor) {
        req.flash('error', "You don't have permission to do that!");
        return res.redirect(`/fountains/${id}`);
    }
    next();
}

module.exports.hasUserVerifiedFountain = async (req, res, next) => {
    const fountainId = req.params.id
    const userId = req.user._id

    const userVerifiedFountain = await FountainService.isFountainVerifiedByUser(fountainId, userId)

    if (userVerifiedFountain && req.method === "POST") {

        req.flash('error', "You already verified this fountain!");
        return res.status(401).send("")
    }

    if (!userVerifiedFountain && req.method === "DELETE") {

        req.flash('error', "You never verified this fountain!");
        return res.status(401).send("")
    }

    next();
}