const mongoose = require("mongoose");
const municipalitiesDataset = require("./italy_munic_geocoded500.json");
const randomInt = require("../utils/randomInt");
const getImageSeeds = require("./getImageSeeds")

const Fountain = require("../models/fountain");
const Comment = require("../models/comment");
const Report = require("../models/report");

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

const seedsNumber = 20

const seedDB = async () => {

    await Fountain.deleteMany({});
    await Comment.deleteMany({});
    await Report.deleteMany({});

    const imagesSeeds = await getImageSeeds()

    for (let i = 0; i < seedsNumber; i++) {

        const randIndex = randomInt(municMaxIndex)

        const munic = municipalitiesDataset[randIndex]

        const address = {
            street: munic.indirizzo,
            city: munic.comune,
            state: munic.provincia,
            country: "Italia"
        }

        const geometry = munic.geometry

        const author = '60b8b72a56bb1632a05b6746' //John

        const images = [imagesSeeds[randomInt(imagesSeeds.length - 1)]]

        const fountain = new Fountain({ address, author, geometry, images })

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