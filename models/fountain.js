const mongoose = require("mongoose")
const Comment = require("./comment")
const Schema = mongoose.Schema;

const FountainSchema = new Schema({
    address: {
        street: String,
        number: Number,
        postcode: Number,
        city: String,
        state: String,
        country: String
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],

    verificationCount: { type: Number, min: 0, default: 0 },

    verifications: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]

})

FountainSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})


module.exports = mongoose.model("Fountain", FountainSchema)