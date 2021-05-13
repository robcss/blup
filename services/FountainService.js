const Fountain = require("../models/fountain")

class FountainService {

    async getAllFountains() {
        const fountains = await Fountain.find({}).populate('author')
        return { fountains }
    }

    async createFountain(data) {
        const newFountain = new Fountain(data)
        await newFountain.save()
        return { newFountain }
    }

    async getFountain(id) {
        const fountain = await Fountain.findById(id)
        return { fountain }
    }

    async getFountainComplete(id) {
        const fountain = await Fountain.findById(id)
            .populate({
                path: 'comments',
                populate: {
                    path: 'author'
                }
            })
            .populate({
                path: 'reports',
                populate: [
                    { path: 'author', select: '_id username' },
                    { path: 'resolvedAuthor', select: '_id username' }
                ],
                options: { sort: { resolved: 1, createdAt: -1 } }
            })
            .populate('author')
            .populate("verifications", "username")

        return { fountain }
    }

    async isFountainVerifiedByUser(id, userId) {
        const fountains = await Fountain.find(
            { _id: id },
            { verifications: { $elemMatch: { $eq: userId } } })//is the user in the verifications array?

        return fountains[0].verifications.length > 0

    }

    async updateFountain(id, data) {
        const fountain = await Fountain.findByIdAndUpdate(id, data)
        return { fountain }
    }

    async deleteFountain(id) {
        await Fountain.findByIdAndDelete(id)
    }

}

module.exports = new FountainService