const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const opts = {
    timestamps: true,
    toJSON: { virtuals: true }
}

const reportSchema = new Schema(
    {
        body: String,
        resolved: { type: Boolean, default: false },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    opts
);


reportSchema.virtual('createdAt_Date').get(function () {
    return this.createdAt.toLocaleDateString('it-IT')
});

reportSchema.virtual('createdAt_Time').get(function () {
    return this.createdAt.toLocaleTimeString('it-IT')
});

module.exports = mongoose.model("Report", reportSchema);