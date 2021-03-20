const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const FountainSchema = new Schema({
    address: {
        street: String,
        number: Number,
        postcode: Number,
        city: String,
        state: String,
        country: String
    }
})

module.exports = mongoose.model("Fountain", FountainSchema)