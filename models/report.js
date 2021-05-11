const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const opts = {
    timestamps: true,
    toJSON: { virtuals: true }
}

const reportSchema = new Schema(
    {
        title: String,
        description: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        resolvedAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    opts
);

reportSchema.virtual("resolved").get(function () {
    if (this.resolvedAuthor) return true
    return false
})

reportSchema.virtual('createdAt_Date').get(function () {
    return this.createdAt.toLocaleDateString('it-IT')
});

reportSchema.virtual('createdAt_Time').get(function () {
    return this.createdAt.toLocaleTimeString('it-IT')
});

reportSchema.virtual('updatedAt_Date').get(function () {
    return this.updatedAt.toLocaleDateString('it-IT')
});

reportSchema.virtual('updatedAt_Time').get(function () {
    return this.updatedAt.toLocaleTimeString('it-IT')
});

module.exports = mongoose.model("Report", reportSchema);