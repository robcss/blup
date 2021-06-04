const mongoose = require("mongoose")
const { DB_URL } = require("../config")

// const dbUrl = 'mongodb://localhost:27017/fountain-finder'
const dbUrl = DB_URL

module.exports = () => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return mongoose.connection
}