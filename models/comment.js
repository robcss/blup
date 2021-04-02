const mongoose = require('mongoose');
const Schema = mongoose.Schema;

new Date().toLocaleDateString()

const options = {
    timestamps: { currentTime: () => new Date().toLocaleDateString("en-GB") }
};

const commentSchema = new Schema(
    {
        body: String
    },
    options);

module.exports = mongoose.model("Comment", commentSchema);