const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/fountain-finder', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return mongoose.connection
}