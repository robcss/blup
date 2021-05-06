const Fountain = require("../models/fountain")

module.exports = async (fountainId, userId) => {

    const fountains = await Fountain.find(
        { _id: fountainId },
        { verifications: { $elemMatch: { $eq: userId } } })//is the user in the verifications array?

    return fountains[0].verifications.length > 0
}