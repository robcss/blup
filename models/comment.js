const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const opts = {
    timestamps: true,
    toJSON: { virtuals: true }
}

const commentSchema = new Schema(
    {
        body: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    opts
);


commentSchema.virtual('createdAt_Date').get(function () {
    return this.createdAt.toLocaleDateString('it-IT')
});

commentSchema.virtual('createdAt_Time').get(function () {
    return this.createdAt.toLocaleTimeString('it-IT')
});

module.exports = mongoose.model("Comment", commentSchema);