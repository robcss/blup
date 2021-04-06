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

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports = mongoose.model("Fountain", FountainSchema)