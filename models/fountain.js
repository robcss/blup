const mongoose = require("mongoose")
const Comment = require("./comment")
const Report = require("./report")
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } }

const FountainSchema = new Schema({
    address: {
        street: String,
        number: Number,
        postcode: Number,
        city: String,
        state: String,
        country: String
    },

    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    images: [ImageSchema],

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

}, opts)

FountainSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <p class="title is-6">
    ${this.address.city || ""}
    ${this.address.state || ""}
</p><p class="subtitle is-6">
    ${this.address.street || ""}
    ${this.address.number || ""}
    <br>
    <br>
    Verifications: ${this.verificationCount}
    <br>
    Reports: ${this.reportCount}
</p>
<div class="button has-text-centered">
<a href="/fountains/${this._id}">Show</a>
</div>`
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