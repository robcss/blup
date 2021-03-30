const mongoose = require("mongoose");
const municipalitiesDataset = require("./italy_munic.json");
const randomInt = require("../utils/randomInt");

const Fountain = require("../models/fountain");

mongoose.connect('mongodb://localhost:27017/fountain-finder', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const municMaxIndex = municipalitiesDataset.length - 3 // avoid selecting the last two objects in the array

const seedsNumber = 50

const seedDB = async () => {

    await Fountain.deleteMany({});

    for (let i = 0; i < seedsNumber; i++) {

        const randIndex = randomInt(municMaxIndex)

        const munic = municipalitiesDataset[randIndex]

        const address = {
            street: munic.indirizzo,
            city: munic.comune,
            state: munic.provincia,
            country: "Italia"
        }

        const fountain = new Fountain({ address })

        await fountain.save()
    }
}

seedDB().then(() => {
    console.log("DB seeded")
    mongoose.connection.close();
})


// const seedTest = async () => {
//     const fountain = new Fountain({
//         address: {
//             street: "Via Bari",
//             // number: 2,
//             // postcode: 00161,
//             city: "Roma",
//             state: "RM",
//             country: "Italia"
//         }
//     })

//     await fountain.save();
// }

// seedTest().then(() => {
//     mongoose.connection.close();
// })