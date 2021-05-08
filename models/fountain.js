const mongoose = require("mongoose")
const Comment = require("./comment")
const Report = require("./report")
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
    }],

    reportCount: { type: Number, min: 0, default: 0 },

    reports: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]

})

FountainSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })

        await Report.deleteMany({
            _id: {
                $in: doc.reports
            }
        })
    }
})


module.exports = mongoose.model("Fountain", FountainSchema)