const Fountain = require("../models/fountain")
const eventBus = require("../loaders/eventBus")

class FountainService {

    async getAllFountains() {
        const fountains = await Fountain.find({}).populate('author')
        return fountains
    }

    async createFountain(data) {
        const newFountain = new Fountain(data)
        await newFountain.save()
        return newFountain
    }

    async getFountain(id) {
        const fountain = await Fountain.findById(id)
        return fountain
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

        return fountain
    }

    async updateFountain(id, data, imagesToAdd = [], imagesNamesToRemove = []) {
        let fountain = await Fountain.findByIdAndUpdate(id,
            {
                $set: data,
                $push: { images: { $each: imagesToAdd } }
            })

        if (imagesNamesToRemove.length > 0) {
            fountain = await Fountain.findByIdAndUpdate(id,
                {
                    $pull: { images: { filename: { $in: imagesNamesToRemove } } }
                })

            eventBus.send("fountain_imagesDeleted", imagesNamesToRemove)
        }

        return fountain

    }

    async deleteFountain(id) {
        const deletedFountain = await Fountain.findByIdAndDelete(id)
        eventBus.send("fountain_deleted", deletedFountain)
    }

    async isFountainCreatedByUser(id, userId) {
        const fountain = await this.getFountain(id)
        return fountain.author.equals(userId)
    }

    async addComment(id, commentId) {
        const fountain = await Fountain.findByIdAndUpdate(id, { $push: { comments: commentId } }, { new: true })
        return fountain
    }

    async removeComment(id, commentId) {
        const fountain = await Fountain.findByIdAndUpdate(id, { $pull: { comments: commentId } }, { new: true })
        return fountain
    }

    async addReport(id, reportId) {
        const fountain = await Fountain.findByIdAndUpdate(id,
            {
                $inc: { reportCount: 1 },
                $push: { reports: reportId }
            },
            { new: true })

        return fountain
    }

    async decreaseReportCount(id) {
        const fountain = await Fountain.findByIdAndUpdate(id, { $inc: { reportCount: -1 } }, { new: true })
        return fountain
    }

    async addVerification(id, userId) {
        const fountain = await Fountain.findByIdAndUpdate(id,
            {
                $inc: { verificationCount: 1 },
                $push: { verifications: userId }
            },
            { new: true }).populate("verifications", "username")

        return fountain
    }

    async removeVerification(id, userId) {
        const fountain = await Fountain.findByIdAndUpdate(id,
            {
                $inc: { verificationCount: -1 },
                $pull: { verifications: userId }
            },
            { new: true }).populate("verifications", "username")

        return fountain
    }

    async isFountainVerifiedByUser(id, userId) {
        const fountains = await Fountain.find(
            { _id: id },
            { verifications: { $elemMatch: { $eq: userId } } })//is the user in the verifications array?

        return fountains[0].verifications.length > 0
    }
}

module.exports = new FountainService