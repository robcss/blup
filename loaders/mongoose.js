const mongoose = require("mongoose")
const { DB_URL } = require("../config")

module.exports = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return mongoose.connection
}